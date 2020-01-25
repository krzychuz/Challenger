using System.Collections.Generic;
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
    public class ChallengeRequestController : Controller
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IEndomondoRestClient endomondoRestClient;

        public ChallengeRequestController(IUnitOfWork unitOfWork, IEndomondoRestClient endomondoRestClient)
        {
            this.unitOfWork = unitOfWork;
            this.endomondoRestClient = endomondoRestClient;
        }

        [HttpPost, Route("PopulateTeamsRequest")]
        public async Task<IActionResult> PopulateTeams(PopulateTeamsRequest populateTeamsRequest)
        {
            var participants = await endomondoRestClient.GetParticipantsFromEndomondo(populateTeamsRequest);
            
            var participantsRepository = unitOfWork.Repository<Participant>();
            var teamsRepository = unitOfWork.Repository<Team>();

            participantsRepository.DeleteAll();
            teamsRepository.DeleteAll();
            foreach (var participant in participants)
                participantsRepository.Insert(participant);

            return Ok();
        }

    }
}