using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Challenger.Web.Models
{
    public class IndividualScoreSnapshot
    {
        public IList<Participant> Participants { get; set; }

        public DateTime SnapshotDate { get; set; }
    }
}
