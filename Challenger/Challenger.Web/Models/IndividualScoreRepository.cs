using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Challenger.Web.Models
{
    public class IndividualScoreRepository
    {
        public IList<IndividualScoreSnapshot> Snapshots { get; set; }
    }
}
