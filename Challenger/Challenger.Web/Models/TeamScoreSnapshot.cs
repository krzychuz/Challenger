using LiteDB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Challenger.Web.Models
{
    public class TeamScoreSnapshot
    {
        [BsonField]
        public IList<Team> Teams { get; set; }

        [BsonId]
        public DateTime SnapshotDate { get; set; }
    }
}
