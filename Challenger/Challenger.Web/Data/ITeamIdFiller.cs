using System.Collections.Generic;
using Challenger.Web.Models;

namespace Challenger.Web.Data
{
    public interface ITeamNumbersFiller
    {
        void FillTeamNumbers(IEnumerable<Participant> participants);
    }
}