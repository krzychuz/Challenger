using System.Collections.Generic;
using System.Threading.Tasks;
using Challenger.Web.Configuration;
using Challenger.Web.EndomondoRest;
using Challenger.Web.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Challenger.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChallengeController : Controller
    {
        private readonly IEndomondoRestClient endomondoRestClient;

        public ChallengeController(IEndomondoRestClient endomondoRestClient)
        {
            this.endomondoRestClient = endomondoRestClient;
        }

        [HttpGet, Route("[action]")]
        public async Task<IActionResult> ChallengeData()
        {
            ChallengeResponse challengeData = await endomondoRestClient.GetChallengeData();

            return Ok(challengeData);
        }

        [HttpGet, Route("[action]")]
        public async Task<IActionResult> GetTeamsData()
        {
            List<Team> teams = await endomondoRestClient.GetTeamsScore();

            return Ok(teams);
        }

        [HttpGet, Route("[action]")]
        public async Task<IActionResult> GetTeamsSplit()
        {
            List<Participant> teams = await endomondoRestClient.GetTeamsSplit();

            return Ok(teams);
        }

        [HttpGet, Route("[action]")]
        public async Task<IActionResult> GetIndividualScores()
        {
            List<Participant> teams = await endomondoRestClient.GetIndividualScores();

            return Ok(teams);
        }

    }
}