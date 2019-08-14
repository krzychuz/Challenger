using System.Collections.Generic;
using System.Threading.Tasks;
using Challenger.Web.Configuration;
using Challenger.Web.EndomondoRest;
using Challenger.Web.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Challenger.Web.Controllers
{
    public class ChallengeController : Controller
    {
        private readonly IEndomondoRestClient endomondoRestClient;

        public ChallengeController(IEndomondoRestClient endomondoRestClient)
        {
            this.endomondoRestClient = endomondoRestClient;
        }

        public async Task<IActionResult> ChallengeData()
        {
            ChallengeResponse challengeData = await endomondoRestClient.GetChallengeData();

            return Ok(challengeData);
        }

        public async Task<IActionResult> GetTeamsData()
        {
            List<Team> teams = await endomondoRestClient.GetTeamsScore();

            return Ok(teams);
        }

        public async Task<IActionResult> GetTeamsSplit()
        {
            List<Participant> teams = await endomondoRestClient.GetTeamsSplit();

            return Ok(teams);
        }
    }
}