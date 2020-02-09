using LiteDB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Challenger.Web.Models
{
    public class IndividualScoreSnapshot
    {
        [BsonField]
        public IList<Participant> Participants { get; set; }

        [BsonId]
        public DateTime SnapshotDate { get; set; }
    }
}
