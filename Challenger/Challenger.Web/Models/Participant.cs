using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Challenger.Web.Models
{
    public class Participants : Team
    {
        public Participants(int id, string name) : base(id, name)
        {
            ParticipantsList = new List<Friend>();
        }

        public List<Friend> ParticipantsList { get; set; }
    }
}
