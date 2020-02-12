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

            var teamsScoresRepository = unitOfWork.Repository<TeamProgressSnapshot>();
            var snapshotDate = DateTime.Now;

            var participants = (await endomondoRestClient.GetParticipantsFromEndomondo()).ToList();

            foreach (var participant in participants)
                participant.TeamNumber = teamDetailsFetcher.GetTeamNumber(participant);

            foreach (var team in teams)
                team.Score = participants.Where(p => p.TeamNumber == team.Id).Select(p => p.Score).Sum();

            foreach (var team in teams)
            {
                var teamSnapshot = teamsScoresRepository.Get(t => t.TeamName == team.Name).SingleOrDefault();

                if (teamSnapshot == null)
                {
                    var teamProgressSnapshot = CreateNewTeamSnapshot(snapshotDate, team);
                    teamsScoresRepository.Insert(teamProgressSnapshot);
                }
                else
                {
                    var newDataSnapshot = new DataSnapshot
                    {
                        Date = snapshotDate,
                        Score = team.Score
                    };

                    teamSnapshot.DataSnapshots.Add(newDataSnapshot);
                    teamsScoresRepository.Edit(teamSnapshot);
                }
            }

        }

        public async void CreateIndividualScoresSnapshot()
        {
            List<Participant> participants = await endomondoRestClient.GetIndividualScores();

            var individualScoresRepository = unitOfWork.Repository<IndividualProgressSnapshot>();
            var snapshotDate = DateTime.Now;

            foreach (var participant in participants)
            {
                var participantSnapshot = individualScoresRepository.Get(p => p.ParticipantName == participant.DisplayName).SingleOrDefault();

                if (participantSnapshot == null)
                {
                    var individualProgressSnapshot = CreateNewParticipantSnapshot(snapshotDate, participant);
                    individualScoresRepository.Insert(individualProgressSnapshot);
                }
                else
                {
                    var newDataSnapshot = new DataSnapshot
                    {
                        Date = snapshotDate,
                        Score = participant.Score
                    };

                    participantSnapshot.DataSnapshots.Add(newDataSnapshot);
                    individualScoresRepository.Edit(participantSnapshot);
                }
            }
        }

        private IndividualProgressSnapshot CreateNewParticipantSnapshot(DateTime snapshotDate, Participant participant)
        {
            var individualProgressSnapshot = new IndividualProgressSnapshot
            {
                ParticipantName = participant.DisplayName
            };

            var firstDataSnapshot = new DataSnapshot
            {
                Date = snapshotDate,
                Score = participant.Score
            };

            var newSnapshotList = new List<DataSnapshot>
            {
                firstDataSnapshot
            };

            individualProgressSnapshot.DataSnapshots = newSnapshotList;

            return individualProgressSnapshot;
        }

        private TeamProgressSnapshot CreateNewTeamSnapshot(DateTime snapshotDate, Team team)
        {
            var teamProgressSnapshot = new TeamProgressSnapshot
            {
                TeamName = team.Name
            };

            var firstDataSnapshot = new DataSnapshot
            {
                Date = snapshotDate,
                Score = team.Score
            };

            var newSnapshotList = new List<DataSnapshot>
            {
                firstDataSnapshot
            };

            teamProgressSnapshot.DataSnapshots = newSnapshotList;

            return teamProgressSnapshot;
        }
    }
}
