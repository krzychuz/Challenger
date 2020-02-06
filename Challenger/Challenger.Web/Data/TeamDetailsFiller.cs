using System.Collections.Generic;
using System.Linq;
using Challenger.Web.Models;

namespace Challenger.Web.Data
{
    public class TeamDetailsFiller : ITeamDetailsFiller
    {
        private readonly IGenericRepository<Participant> participantsRepository;
        private readonly IGenericRepository<Team> teamsRepository;

        public TeamDetailsFiller(IUnitOfWork unitOfWork)
        {
            participantsRepository = unitOfWork.Repository<Participant>();
            teamsRepository = unitOfWork.Repository<Team>();
        }

        public void FillTeamDetails(IEnumerable<Participant> participants)
        {            
            foreach (var participant in participants)
            {
                FillTeamNumber(participant);
                FillTeamName(participant);
            }
        }

        private void FillTeamNumber(Participant participant)
        {
            var storedParticipant = participantsRepository.Get(p => p.EndomondoId == participant.EndomondoId).SingleOrDefault();

            if (storedParticipant != null)
                participant.TeamNumber = storedParticipant.TeamNumber;
        }

        private void FillTeamName(Participant participant)
        {
            var team = teamsRepository.Get(t => t.Id == participant.TeamNumber).SingleOrDefault();

            participant.TeamName = team?.Name ?? "Unassigned";
        }
    }
}