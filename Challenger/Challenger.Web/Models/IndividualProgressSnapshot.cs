using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Challenger.Web.Models
{
    public class IndividualProgressSnapshot
    {
        public int Id { get; set; }

        public string ParticipantName { get; set; }

        public IList<DataSnapshot> DataSnapshots { get; set; }
    }
}
