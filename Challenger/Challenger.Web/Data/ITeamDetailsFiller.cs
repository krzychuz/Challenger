using System.Collections.Generic;
using Challenger.Web.Models;

namespace Challenger.Web.Data
{
    public interface ITeamDetailsFiller
    {
        void FillTeamDetails(IEnumerable<Participant> participants);
    }
}