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
    public class ParticipantsController : Controller
    {
        private readonly IUnitOfWork unitOfWork;

        public ParticipantsController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        [HttpGet, Route("participants")]
        public IActionResult GetParticipants()
        {
            var repository = unitOfWork.Repository<Participant>();

            return Ok(repository.GetAll());
        }
        
        [HttpGet, Route("participants/{participantId}")]
        public IActionResult GetParticipant(int participantId)
        {
            var repository = unitOfWork.Repository<Participant>();
            var participant = repository.GetById(participantId);
            if (participant == null)
                return NotFound();
            
            return Ok(participant);
        }
        
    }
}