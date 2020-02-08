using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Challenger.Web.ViewModels
{
    public class ParticipantViewModel
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string DisplayName { get; set; }

        public int TeamNumber { get; set; }

        public string TeamName { get; set; }

        public string PictureUrl { get; set; }
    }
}
