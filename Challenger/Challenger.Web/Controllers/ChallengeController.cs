using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Challenger.Web.Configuration;
using Challenger.Web.Data;
using Challenger.Web.EndomondoRest;
using Challenger.Web.Models;
using Challenger.Web.ViewModels;
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
        private readonly ITeamDetailsFetcher teamDetailsFetcher;
        private readonly IParticipantViewModelFactory participantViewModelFactory;

        public ChallengeController(IEndomondoRestClient endomondoRestClient, ITeamDetailsFetcher teamNumbersFiller,
            IUnitOfWork unitOfWork, IParticipantViewModelFactory participantViewModelFactory)
        {
            this.endomondoRestClient = endomondoRestClient;
            this.teamDetailsFetcher = teamNumbersFiller;
            this.unitOfWork = unitOfWork;
            this.participantViewModelFactory = participantViewModelFactory;
        }

        [HttpGet, Route("[action]")]
        public async Task<IActionResult> ChallengeData()
        {
            ChallengeResponse challengeData = await endomondoRestClient.GetChallengeData();

            return Ok(challengeData);
        }

        [HttpGet, Route("TeamsData")]
        public async Task<IActionResult> GetTeamsData()
        {
            List<Team> teams = unitOfWork.Repository<Team>().GetAll().ToList();
            var participants = (await endomondoRestClient.GetParticipantsFromEndomondo()).ToList();

            foreach (var participant in participants)
                participant.TeamNumber = teamDetailsFetcher.GetTeamNumber(participant);

            foreach (var team in teams)
                team.Score = participants.Where(p => p.TeamNumber == team.Id).Select(p => p.Score).Sum();

            return Ok(teams);
        }

        [HttpGet, Route("TeamsSplit")]
        public async Task<IActionResult> GetTeamsSplit()
        {
            List<Participant> participants = await endomondoRestClient.GetTeamsSplit();
            List<ParticipantViewModel> participantsViewModels = new List<ParticipantViewModel>();
            
            foreach (var participant in participants)
                participantsViewModels.Add(participantViewModelFactory.GetViewModel(participant));

            return Ok(participantsViewModels);
        }

        [HttpGet, Route("IndividualScores")]
        public async Task<IActionResult> GetIndividualScores()
        {
            List<Participant> participants = await endomondoRestClient.GetIndividualScores();
            List<ParticipantViewModel> participantsViewModels = new List<ParticipantViewModel>();

            foreach (var participant in participants)
                participantsViewModels.Add(participantViewModelFactory.GetViewModel(participant));

            return Ok(participantsViewModels);
        }

    }
}