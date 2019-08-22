using Newtonsoft.Json;

namespace Challenger.Web.Configuration
{
    public class ConfigurationParticipant
    {
        [JsonProperty(PropertyName = "participantId")]
        public int ParticipantId { get; set; }
        [JsonProperty(PropertyName = "teamNumber")]
        public int TeamNumber { get; set; } 
    }
}