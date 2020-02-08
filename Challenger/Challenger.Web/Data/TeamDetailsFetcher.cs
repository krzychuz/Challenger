using System.Collections.Generic;
using System.Linq;
using Challenger.Web.Models;

namespace Challenger.Web.Data
{
    public class TeamDetailsFetcher : ITeamDetailsFetcher
    {
        private readonly IGenericRepository<Participant> participantsRepository;
        private readonly IGenericRepository<Team> teamsRepository;

        public TeamDetailsFetcher(IUnitOfWork unitOfWork)
        {
            participantsRepository = unitOfWork.Repository<Participant>();
            teamsRepository = unitOfWork.Repository<Team>();
        }

        public int GetTeamNumber(Participant participant)
        {
            var storedParticipant = participantsRepository.Get(p => p.EndomondoId == participant.EndomondoId).SingleOrDefault();

            if (storedParticipant != null)
                return storedParticipant.TeamNumber;

            return 0;
        }

        public string GetTeamName(Participant participant)
        {
            var team = teamsRepository.Get(t => t.Id == GetTeamNumber(participant)).SingleOrDefault();
            return team?.Name ?? "Unassigned";
        }
    }
}