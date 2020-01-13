using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Challenger.Web.Models
{
    public class Participant : Friend, IFriend
    {
        public int TeamNumber { get; set; }
        public int Score { get; set; }
        public int Position { get; set; }
        public string DisplayName
        {
            get
            {
                return (FirstName + " " + LastName);
            }
        }

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
