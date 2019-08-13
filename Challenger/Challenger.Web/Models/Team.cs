using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Challenger.Web.Models
{
    public class Team
    {
        public Team(int id)
        {
            Id = id;
            Participants = new List<Friend>();
        }

        public List<Friend> Participants { get; set; }
        public int Id { get; set; }
    }
}
