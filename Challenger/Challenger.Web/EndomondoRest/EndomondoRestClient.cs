using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Challenger.Web.Configuration;
using Challenger.Web.Mocks;
using Challenger.Web.Models;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;

namespace Challenger.Web.EndomondoRest
{
    public class EndomondoRestClient : IEndomondoRestClient
    {
        private readonly Uri EndomondoBaseUri;
        private readonly string login;
        private readonly string password;
        private string authToken;
        private const string BadRequestResponseMessage = "SC_BAD_REQUEST";
        
        private readonly IOptions<EndomondoData> configuration;

        private readonly HttpClient client;

        public EndomondoRestClient(IOptions<EndomondoData> configuration)
        {
            this.configuration = configuration;
            login = configuration.Value.Credentials.Login;
            password = configuration.Value.Credentials.Password;
            client = new HttpClient();
            EndomondoBaseUri = new Uri("https://api.mobile.endomondo.com");
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
            var response = await client.PostAsync(new Uri(EndomondoBaseUri, authEndpoint), content);

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
            while (true)
            {
                const string challengeEndpoint = "/mobile/api/challenge/get";

                var parameters = new Dictionary<string, string>
                {
                    {"challengeId", configuration.Value.ChallengeId}, {"authToken", authToken},
                    {"fields", "basic,sports,cans,is_in,friends,leaderboard,total,size"}
                };

                var content = new FormUrlEncodedContent(parameters);
                var response = await client.PostAsync(new Uri(EndomondoBaseUri, challengeEndpoint), content);
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

        public async Task<List<Team>> GetTeamsScore()
        {
            var teams = new Dictionary<int, Team>();
            var mock = new TeamSplitMock();

            for(int i = 1; i < 8; i++)
                teams[i] = new Team(i, "Team " + i);

            teams[0] = new Team(0, "Unknown team");

            var challengeData = await GetChallengeData();

            foreach(var r in challengeData.Ranks)
            {
                int team = 0;
                try
                {
                    team = mock.TeamsDictionary[r.From.Id];
                    teams[team].Score += r.Value;
                }
                catch(KeyNotFoundException)
                {
                    teams[0].Score += r.Value;
                }
            }

            var teamsList = teams.Values.ToList();
            var sortedTemasList = teamsList.OrderByDescending(x => x.Score).ToList();

            return sortedTemasList;
        }

        public async Task<List<Participants>> GetTeamsSplit()
        {
            var teams = new Dictionary<int, Participants>();
            var mock = new TeamSplitMock();

            for (int i = 1; i < 8; i++)
                teams[i] = new Participants(i, "Team " + i);

            teams[0] = new Participants(0, "Unknown team");

            var challengeData = await GetChallengeData();

            foreach (var r in challengeData.Ranks)
            {
                int team = 0;
                try
                {
                    team = mock.TeamsDictionary[r.From.Id];
                    teams[team].ParticipantsList.Add(r.From);
                }
                catch (KeyNotFoundException)
                {
                    teams[0].Score += r.Value;
                }
            }

            var teamsList = teams.Values.ToList();
            var sortedTemasList = teamsList.OrderByDescending(x => x.Id).ToList();

            return sortedTemasList;
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
    }
}