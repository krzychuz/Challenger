using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Challenger.Web.Models
{
    public class Participant : Friend, IFriend
    {
        public int EndomondoId { get; set; }
        public int TeamNumber { get; set; }
        public double Score { get; set; }
        public int Position { get; set; }
        public string DisplayName => (FirstName + " " + LastName);

        public Participant(IFriend friend)
        {
            FirstName = friend.FirstName;
            LastName = friend.LastName;
        }

        public Participant()
        {
        }
    }
}
