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
        private readonly EndomondoRestClient endomondoRestClient;

        public ChallengeController(IOptions<EndomondoData> configuration)
        {
            endomondoRestClient = new EndomondoRestClient(configuration);
        }

        public async Task<IActionResult> ChallengeData()
        {
            ChallengeResponse challengeData = await endomondoRestClient.GetChallengeData();

            return Ok(challengeData);
        }

        public async Task<IActionResult> GetTeamsData()
        {
            Dictionary<int, Team> teams = await endomondoRestClient.GetTeamsScore();

            return Ok(teams);
        }
    }
}