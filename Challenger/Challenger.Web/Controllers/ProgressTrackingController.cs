﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Challenger.Web.Data;
using Challenger.Web.Models;
using Challenger.Web.Tools;
using Microsoft.AspNetCore.Mvc;

namespace Challenger.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProgressTrackingController : Controller
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly ISnapshotCreator snapshotCreator;

        public ProgressTrackingController(IUnitOfWork unitOfWork, ISnapshotCreator snapshotCreator)
        {
            this.unitOfWork = unitOfWork;
            this.snapshotCreator = snapshotCreator;
        }

        [HttpGet, Route("IndividualScoreProgress")]
        public IActionResult GetIndividualScoreProgress()
        {
            var individualScoreRepository = unitOfWork.Repository<IndividualScoreSnapshot>();
            var individualScores = individualScoreRepository.GetAll().ToList();

            return Ok(individualScores);
        }

        [HttpGet, Route("TeamScoreProgress")]
        public IActionResult GetTeamScoreProgress()
        {
            var teamScoreRepository = unitOfWork.Repository<TeamScoreSnapshot>();
            var teamScores = teamScoreRepository.GetAll().ToList();

            return Ok(teamScores);
        }

        [HttpPost, Route("CreateIndividualScoreSnapshot")]
        public IActionResult CreateIndividualScoreSnapshot()
        {
            // Development purposes only, normally executed by ServiceScheduler
            snapshotCreator.CreateIndividualScoresSnapshot();
            return Ok();
        }

        [HttpPost, Route("CreateTeamScoreSnapshot")]
        public IActionResult CreateTeamScoreSnapshot()
        {
            // Development purposes only, normally executed by ServiceScheduler
            snapshotCreator.CreateChallengeSnapshot();
            return Ok();
        }
    }
}