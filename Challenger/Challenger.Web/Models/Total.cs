using Newtonsoft.Json;

namespace Challenger.Web.Models
{
    public class Total
    {
        [JsonProperty(PropertyName = "burgers_burned")]
        public int BurgersBurned { get; set; }
        [JsonProperty(PropertyName = "calories")]
        public int Calories { get; set; }
        [JsonProperty(PropertyName = "distance")]
        public int Distance { get; set; }
        [JsonProperty(PropertyName = "duration")]
        public int Duration { get; set; }
        [JsonProperty(PropertyName = "workouts")]
        public int Workouts { get; set; }
    }
}