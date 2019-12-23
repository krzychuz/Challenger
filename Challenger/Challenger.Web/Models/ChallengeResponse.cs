using System.Collections.Generic;
using Newtonsoft.Json;

namespace Challenger.Web.Models
{
    public class ChallengeResponse
    {
    [JsonProperty(PropertyName = "access")]
        public string Access { get; set; }
        [JsonProperty(PropertyName = "are_terms_mandatory")]
        public bool AreTermsMandatory { get; set; }
        [JsonProperty(PropertyName = "can_join")]
        public bool CanJoin { get; set; }
        [JsonProperty(PropertyName = "can_leave")]
        public bool CanLeave { get; set; }
        [JsonProperty(PropertyName = "comments_enabled")]
        public bool CommentsEnabled { get; set; }
        [JsonProperty(PropertyName = "cover_picture_id")]
        public int CoverPictureId { get; set; }
        [JsonProperty(PropertyName = "cover_picture_url")]
        public string CoverPictureUrl { get; set; }
        [JsonProperty(PropertyName = "creator_first_name")]
        public string CreatorFirstName { get; set; }
        [JsonProperty(PropertyName = "creator_id")]
        public int CreatorId { get; set; }
        [JsonProperty(PropertyName = "creator_last_name")]
        public string CreatorLastName { get; set; }
        [JsonProperty(PropertyName = "description")]
        public string Description { get; set; }
        [JsonProperty(PropertyName = "end_time")]
        public string EndTime { get; set; }
        [JsonProperty(PropertyName = "friends")]
        public List<Friend> Friends { get; set; }
        [JsonProperty(PropertyName = "goal")]
        public int Goal { get; set; }
        [JsonProperty(PropertyName = "id")]
        public int Id { get; set; }
        [JsonProperty(PropertyName = "is_in")]
        public bool IsIn { get; set; }
        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }
        [JsonProperty(PropertyName = "picture_id")]
        public int PictureId { get; set; }
        [JsonProperty(PropertyName = "picture_url")]
        public string PictureUrl { get; set; }
        [JsonProperty(PropertyName = "ranks")]
        public List<Rank> Ranks { get; set; }
        [JsonProperty(PropertyName = "size")]
        public int Size { get; set; }
        [JsonProperty(PropertyName = "start_time")]
        public string StartTime { get; set; }
        [JsonProperty(PropertyName = "total")]
        public Total Total { get; set; }
        [JsonProperty(PropertyName = "type")]
        public int Type { get; set; }
        [JsonProperty(PropertyName = "workout_filter")]
        public int WorkoutFilter { get; set; } 
    }
}