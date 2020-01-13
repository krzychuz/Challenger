using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Challenger.Web.Configuration;
using Challenger.Web.Data;
using Challenger.Web.EndomondoRest;
using Challenger.Web.Models;
using Microsoft.AspNetCore.Mvc;

namespace Challenger.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TeamsController : Controller
    {
        private readonly IUnitOfWork unitOfWork;

        public TeamsController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }
        
        [HttpPost, Route("teams")]
        public IActionResult PostTeam(Team team)
        {
            var repository = unitOfWork.Repository<Team>();

            if (team != null && repository.GetById(team.Id) != null)
                return Conflict();
            
            repository.Insert(team);
            
            return Ok();
        }
        
        [HttpPut, Route("teams/{teamId}")]
        public IActionResult PutTeam(int teamId, Team team)
        {
            var repository = unitOfWork.Repository<Team>();

            var existingTeam = repository.GetById(teamId);
            
            if (team == null)
                return NotFound();

            existingTeam.Name = team.Name;
            existingTeam.Score = team.Score;
            
            repository.Edit(existingTeam);
            
            return Ok();
        }

        [HttpGet, Route("teams")]
        public IActionResult GetTeams()
        {
            var teamRepository = unitOfWork.Repository<Team>();
            var participantRepository = unitOfWork.Repository<Participant>();

            var teams = teamRepository.GetAll().ToList();
            foreach (var team in teams)
            {
                var participants = participantRepository.Get(p => p.TeamNumber == team.Id);
                team.Participants = participants.ToList();
            }

            var unassignedTeam = new Team()
            {
                Id = default(int),
                Name = "Unassigned",
                Participants = participantRepository.Get(p => p.TeamNumber == default(int)).ToList()
            };
            teams.Append(unassignedTeam);

        return Ok(teams);
        }
        
        [HttpDelete, Route("teams/{teamId}")]
        public IActionResult DeleteTeam(int teamId)
        {
            var repository = unitOfWork.Repository<Team>();
            var team = repository.GetById(teamId);

            if (team == null)
                return NotFound();
            
            repository.Delete(teamId);
            repository.Save();
            
            return Ok();
        }

        [HttpGet, Route("teams/{teamId}/participants/{participantId}")]
        public IActionResult GetParticipant(int teamId, int participantId)
        {
            var repository = unitOfWork.Repository<Participant>();

            var participant = repository.Get(p => p.Id == participantId && p.TeamNumber == teamId);
            if (participant == null)
                return NotFound();
            
            return Ok(participant);
        }
        
        [HttpGet, Route("teams/{teamId}/participants")]
        public IActionResult GetTeam(int teamId)
        {
            var teamRepository = unitOfWork.Repository<Team>();
            var participantRepository = unitOfWork.Repository<Participant>();
            
            var team = teamRepository.GetById(teamId);
            
            if (team == null)
                return NotFound();

            var participants = participantRepository.Get(p => p.TeamNumber == team.Id);
            team.Participants = participants.ToList();
            

            return Ok(team);
        }
        
        [HttpPost, Route("teams/{teamId}/participants")]
        public IActionResult PostParticipant(int teamId, int participantId)
        {
            var teamRepository = unitOfWork.Repository<Team>();
            var participantRepository = unitOfWork.Repository<Participant>();
            
            var team = teamRepository.GetById(teamId);
            if (team == null)
                return NotFound();

            var participant = participantRepository.GetById(participantId);
            if (participant == null)
                return NotFound();

            participant.TeamNumber = teamId;
            participantRepository.Edit(participant);
            
            return Ok();
        }
        
        [HttpDelete, Route("teams/{teamId}/participants")]
        public IActionResult DeleteParticipant(int teamId, int participantId)
        {
            var teamRepository = unitOfWork.Repository<Team>();
            var participantRepository = unitOfWork.Repository<Participant>();
            
            var team = teamRepository.GetById(teamId);
            if (team == null)
                return NotFound();

            var participant = participantRepository.GetById(participantId);
            if (participant == null)
                return NotFound();

            participant.TeamNumber = default(int);
            
            return Ok();
        }
    }
}