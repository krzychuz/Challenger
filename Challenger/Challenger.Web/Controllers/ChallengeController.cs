using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Challenger.Web.Configuration;
using Challenger.Web.Data;
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
        private readonly IUnitOfWork unitOfWork;
        private readonly ITeamDetailsFiller teamNumbersFiller;

        public ChallengeController(IEndomondoRestClient endomondoRestClient, ITeamDetailsFiller teamNumbersFiller,
            IUnitOfWork unitOfWork)
        {
            this.endomondoRestClient = endomondoRestClient;
            this.teamNumbersFiller = teamNumbersFiller;
            this.unitOfWork = unitOfWork;
        }

        [HttpGet, Route("[action]")]
        public async Task<IActionResult> ChallengeData()
        {
            ChallengeResponse challengeData = await endomondoRestClient.GetChallengeData();

            return Ok(challengeData);
        }

        [HttpGet, Route("[action]")]
        public async Task<IActionResult> TeamsData()
        {
            List<Team> teams = unitOfWork.Repository<Team>().GetAll().ToList();
            var participants = (await endomondoRestClient.GetParticipantsFromEndomondo()).ToList();
            teamNumbersFiller.FillTeamDetails(participants);

            foreach (var team in teams)
                team.Score = participants.Where(p => p.TeamNumber == team.Id).Select(p => p.Score).Sum();

            return Ok(teams);
        }

        [HttpGet, Route("[action]")]
        public async Task<IActionResult> TeamsSplit()
        {
            List<Participant> participants = await endomondoRestClient.GetTeamsSplit();
            teamNumbersFiller.FillTeamDetails(participants);

            return Ok(participants);
        }

        [HttpGet, Route("[action]")]
        public async Task<IActionResult> IndividualScores()
        {
            List<Participant> participants = await endomondoRestClient.GetIndividualScores();
            teamNumbersFiller.FillTeamDetails(participants);

            return Ok(participants);
        }

    }
}