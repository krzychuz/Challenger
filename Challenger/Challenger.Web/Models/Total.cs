using Newtonsoft.Json;

namespace Challenger.Web.Models
{
    public class Total
    {
        [JsonProperty(PropertyName = "burgers_burned")]
        public double BurgersBurned { get; set; }
        [JsonProperty(PropertyName = "calories")]
        public double Calories { get; set; }
        [JsonProperty(PropertyName = "distance")]
        public double Distance { get; set; }
        [JsonProperty(PropertyName = "duration")]
        public double Duration { get; set; }
        [JsonProperty(PropertyName = "workouts")]
        public int Workouts { get; set; }
    }
}