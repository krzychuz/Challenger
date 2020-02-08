using Challenger.Web.Data;
using Challenger.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Challenger.Web.ViewModels
{
    public class ParticipantViewModelFactory : IParticipantViewModelFactory
    {
        private readonly ITeamDetailsFetcher teamDetailsFiller;

        public ParticipantViewModelFactory(ITeamDetailsFetcher teamDetailsFiller)
        {
            this.teamDetailsFiller = teamDetailsFiller;
        }

        public ParticipantViewModel GetViewModel(Participant model)
        {
            var participantViewModel = new ParticipantViewModel
            {
                FirstName = model.FirstName,
                LastName = model.LastName,
                DisplayName = model.DisplayName,
                TeamName = teamDetailsFiller.GetTeamName(model),
                TeamNumber = teamDetailsFiller.GetTeamNumber(model),
                PictureUrl = model.PictureUrl
            };

            return participantViewModel;
        }
    }
}
