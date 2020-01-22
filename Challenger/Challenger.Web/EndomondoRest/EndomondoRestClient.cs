using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Challenger.Web.Configuration;
using Challenger.Web.Maps;
using Challenger.Web.Models;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;

namespace Challenger.Web.EndomondoRest
{
    public class EndomondoRestClient : IEndomondoRestClient
    {
        private readonly Uri endomondoBaseUri;
        private readonly string login;
        private readonly string password;
        private string authToken;
        private const string BadRequestResponseMessage = "SC_BAD_REQUEST";
        
        private readonly IOptions<EndomondoData> configuration;
        private readonly IChallengeResponseParticipantsMapper challengeResponseParticipantsMapper;

        private readonly HttpClient client;

        public EndomondoRestClient(IOptions<EndomondoData> configuration, 
            IChallengeResponseParticipantsMapper challengeResponseParticipantsMapper)
        {
            this.configuration = configuration;
            this.challengeResponseParticipantsMapper = challengeResponseParticipantsMapper;
            login = configuration.Value.Credentials.Login;
            password = configuration.Value.Credentials.Password;
            client = new HttpClient();
            endomondoBaseUri = new Uri("https://api.mobile.endomondo.com");
        }

        private async Task Login()
        {
            const string authEndpoint = "/mobile/auth";
            
            var parameters = new Dictionary<string, string>
            {
                {"country", "pl"},
                {"deviceId", string.Empty},
                {"password", password},
                {"action", "pair"},
                {"email", login}
            };
            var content = new FormUrlEncodedContent(parameters);
            var response = await client.PostAsync(new Uri(endomondoBaseUri, authEndpoint), content);

            if (response.IsSuccessStatusCode)
            {
                Task<string> responseString = response.Content.ReadAsStringAsync();
                var responseDictionary = ParseLoginResponse(await responseString);

                if (responseDictionary.ContainsKey(nameof(authToken)))
                    authToken = responseDictionary[nameof(authToken)];
                else
                    throw new Exception("Authorization token was not fetched. Failed to login.");
            }
            else
                throw new Exception("Could not login.");
        }

        public async Task<ChallengeResponse> GetChallengeData()
        {
            return await GetChallengeData(configuration.Value.ChallengeId);
        }
        
        public async Task<ChallengeResponse> GetChallengeData(int challengeId)
        {
            while (true)
            {
                const string challengeEndpoint = "/mobile/api/challenge/get";

                var parameters = new Dictionary<string, string>
                {
                    {"challengeId", challengeId.ToString()}, {"authToken", authToken},
                    {"fields", "basic,sports,cans,is_in,friends,leaderboard,total,size"}
                };

                var content = new FormUrlEncodedContent(parameters);
                var response = await client.PostAsync(new Uri(endomondoBaseUri, challengeEndpoint), content);
                Task<string> responseStringTask = response.Content.ReadAsStringAsync();
                string responseString = await responseStringTask;
                if (!responseString.Contains(BadRequestResponseMessage))
                {
                    var challengeResponse = JsonConvert.DeserializeObject<ChallengeResponse>(responseString);
                    return challengeResponse;
                }

                await Login();
            }
        }
        
        public async Task<List<Participant>> GetTeamsSplit()
        {
            IEnumerable<Participant> participants =
                await GetParticipantsFromEndomondo(configuration.Value.ChallengeId);
            
            return participants.OrderBy(x => x.TeamNumber).ToList();
        }

        public async Task<List<Participant>> GetIndividualScores()
        {
            IEnumerable<Participant> participants =
                await GetParticipantsFromEndomondo(configuration.Value.ChallengeId);

            return participants.OrderByDescending(x => x.Score).ToList();
        }


        private Dictionary<string, string> ParseLoginResponse(string response)
        {
            const string parameterSeparator = "=";
            
            return response?
                .Split("\n")
                .Where(s => s.Contains(parameterSeparator))
                .Select(x => x.Split(parameterSeparator))
                .ToDictionary(x => x[0], x => x[1]);
        }
        
        public async Task<IEnumerable<Participant>> GetParticipantsFromEndomondo(PopulateTeamsRequest populateTeamsRequest)
        {
            ChallengeResponse challengeData = await GetChallengeData(populateTeamsRequest.ChallengeId);

            return challengeResponseParticipantsMapper.MapToParticipants(challengeData);
        }

        public async Task<IEnumerable<Participant>> GetParticipantsFromEndomondo(int challengeId)
        {
            return await GetParticipantsFromEndomondo(new PopulateTeamsRequest {ChallengeId = challengeId});
        }
        
        public async Task<IEnumerable<Participant>> GetParticipantsFromEndomondo()
        {
            return await GetParticipantsFromEndomondo(new PopulateTeamsRequest
                {ChallengeId = configuration.Value.ChallengeId});
        }
    }
}