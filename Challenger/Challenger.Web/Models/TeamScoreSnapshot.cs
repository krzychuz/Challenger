using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Challenger.Web.Models
{
    public class TeamScoreSnapshot
    {
        public IList<Team> Teams { get; set; }

        public DateTime SnapshotDate { get; set; }
    }
}
