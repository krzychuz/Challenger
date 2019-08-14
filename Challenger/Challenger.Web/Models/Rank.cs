using Newtonsoft.Json;

namespace Challenger.Web.Models
{
    public class Rank
    {
        [JsonProperty(PropertyName = "from")]
        public Friend From { get; set; }
        [JsonProperty(PropertyName = "rank")]
        public int Position { get; set; }
        [JsonProperty(PropertyName = "rank_male")]
        public int RankMale { get; set; }
        [JsonProperty(PropertyName = "value")]
        public double Value { get; set; }
        [JsonProperty(PropertyName = "rank_female")]
        public int? RankFemale { get; set; } 
    }
}