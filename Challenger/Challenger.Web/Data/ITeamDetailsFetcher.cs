using System.Collections.Generic;
using Challenger.Web.Models;

namespace Challenger.Web.Data
{
    public interface ITeamDetailsFetcher
    {
        string GetTeamName(Participant participant);

        int GetTeamNumber(Participant participant);
    }
}