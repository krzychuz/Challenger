using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Challenger.Web.Models
{
    public class TeamProgressSnapshot
    {
        public int Id { get; set; }

        public string TeamName { get; set; }

        public IList<DataSnapshot> DataSnapshots { get; set; }
    }
}