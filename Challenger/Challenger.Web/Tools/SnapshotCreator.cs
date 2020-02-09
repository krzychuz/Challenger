using Challenger.Web.Data;
using Challenger.Web.EndomondoRest;
using Challenger.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Challenger.Web.Tools
{
    public class SnapshotCreator : ISnapshotCreator
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IEndomondoRestClient endomondoRestClient;
        private readonly ITeamDetailsFetcher teamDetailsFetcher;

        public SnapshotCreator(IUnitOfWork unitOfWork, IEndomondoRestClient endomondoRestClient,
            ITeamDetailsFetcher teamDetailsFetcher)
        {
            this.unitOfWork = unitOfWork;
            this.endomondoRestClient = endomondoRestClient;
            this.teamDetailsFetcher = teamDetailsFetcher;
        }

        public async void CreateChallengeSnapshot()
        {
            List<Team> teams = unitOfWork.Repository<Team>().GetAll().ToList();
            var participants = (await endomondoRestClient.GetParticipantsFromEndomondo()).ToList();

            foreach (var participant in participants)
                participant.TeamNumber = teamDetailsFetcher.GetTeamNumber(participant);

            foreach (var team in teams)
                team.Score = participants.Where(p => p.TeamNumber == team.Id).Select(p => p.Score).Sum();

            var teamScoreSnapshot = new TeamScoreSnapshot
            {
                Teams = teams,
                SnapshotDate = DateTime.Now
            };

            var teamScoreRepository = unitOfWork.Repository<TeamScoreSnapshot>();
            teamScoreRepository.Insert(teamScoreSnapshot);
        }

        public async void CreateIndividualScoresSnapshot()
        {
            List<Participant> participants = await endomondoRestClient.GetIndividualScores();

            var individualScoresSnapshot = new IndividualScoreSnapshot
            {
                Participants = participants,
                SnapshotDate = DateTime.Now
            };

            var individualScoresRepository = unitOfWork.Repository<IndividualScoreSnapshot>();
            individualScoresRepository.Insert(individualScoresSnapshot);
        }
    }
}
