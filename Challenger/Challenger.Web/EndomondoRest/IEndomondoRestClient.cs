using System.Collections.Generic;
using System.Threading.Tasks;
using Challenger.Web.Models;

namespace Challenger.Web.EndomondoRest
{
    public interface IEndomondoRestClient
    {
        Task<ChallengeResponse> GetChallengeData();
        Task<List<Team>> GetTeamsScore();
        Task<List<Participant>> GetTeamsSplit();
    }
}