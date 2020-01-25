using System.Collections.Generic;
using System.Linq;
using Challenger.Web.Models;

namespace Challenger.Web.Data
{
    public class TeamNumbersFiller : ITeamNumbersFiller
    {
        private readonly IUnitOfWork unitOfWork;

        public TeamNumbersFiller(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        public void FillTeamNumbers(IEnumerable<Participant> participants)
        {
            var repository = unitOfWork.Repository<Participant>();
            
            foreach (var participant in participants)
            {
                var storedParticipant = repository.Get(p => p.EndomondoId == participant.EndomondoId).SingleOrDefault();

                if (storedParticipant != null)
                {
                    participant.TeamNumber = storedParticipant.TeamNumber;
                }
            }
        }
    }
}