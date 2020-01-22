using System.Collections.Generic;
using Challenger.Web.Models;

namespace Challenger.Web.Maps
{
    public interface IChallengeResponseParticipantsMapper
    {
        IEnumerable<Participant> MapToParticipants(ChallengeResponse challengeData);
    }
}