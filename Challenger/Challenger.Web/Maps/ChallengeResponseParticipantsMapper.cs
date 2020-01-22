using System.Collections.Generic;
using System.Linq;
using Challenger.Web.Models;

namespace Challenger.Web.Maps
{
    public class ChallengeResponseParticipantsMapper : IChallengeResponseParticipantsMapper
    {
        public IEnumerable<Participant> MapToParticipants(ChallengeResponse challengeData)
        {
            return challengeData.Ranks.Select(rank => new Participant
                {
                    FirstName = rank.From.FirstName,
                    LastName = rank.From.LastName,
                    Name = rank.From.Name,
                    Position = rank.Position,
                    PictureUrl = rank.From.PictureUrl,
                    Score = rank.Value,
                    Picture = rank.From.Picture,
                    EndomondoId = rank.From.Id
                })
                .ToList();
        } 
    }
}