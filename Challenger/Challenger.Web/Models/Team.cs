using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Challenger.Web.Models
{
    public class Team
    {
        public Team(string name)
        {
            Name = name;
        }

        public Team()
        {
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public double Score { get; set;  }
        
        public IEnumerable<Participant> Participants { get; set; }
    }
}
