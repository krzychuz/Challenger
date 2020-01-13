using System;
using Newtonsoft.Json;

namespace Challenger.Web.Models
{
    public class Friend : IFriend
    {
        [JsonProperty(PropertyName = "first_name")]
        public string FirstName { get; set; }
        
        [JsonProperty(PropertyName = "id")]
        public int Id { get; set; }
        
        [JsonProperty(PropertyName = "last_name")]
        public string LastName { get; set; }
        
        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }
        
        [JsonProperty(PropertyName = "picture")]
        public int Picture { get; set; }
        
        [JsonProperty(PropertyName = "picture_url")]
        public string PictureUrl { get; set; }
        
        [JsonProperty(PropertyName = "premium_type")]
        public string PremiumType { get; set; }
        
        [JsonProperty(PropertyName = "premium")]
        public bool? Premium { get; set; }
    }
}