using System.Collections.Generic;
using System.Threading.Tasks;
using Challenger.Web.Models;

namespace Challenger.Web.EndomondoRest
{
    public interface IEndomondoRestClient
    {
        Task<ChallengeResponse> GetChallengeData();
        Task<ChallengeResponse> GetChallengeData(int challengeId);
        Task<List<Participant>> GetTeamsSplit();
        Task<List<Participant>> GetIndividualScores();
        Task<IEnumerable<Participant>> GetParticipantsFromEndomondo(PopulateTeamsRequest populateTeamsRequest);
        Task<IEnumerable<Participant>> GetParticipantsFromEndomondo(int challengeId);
        Task<IEnumerable<Participant>> GetParticipantsFromEndomondo();
    }
}