﻿using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using gymNotebook.Infrastructure.Commands.Trainings.Training;
using gymNotebook.Infrastructure.Services;
using gymNotebook.Infrastructure.Commands;

namespace gymNotebook.Api.Controllers
{
    [Authorize]
    public class FullTrainingController : ApiControllerBase
    {
        private readonly ITrainingService _trainingService;

        public FullTrainingController(ITrainingService trainingService,
            ICommandDispatcher commandDispatcher) : base(commandDispatcher)
        {
            _trainingService = trainingService;
        }

        // GET: Trainings
        [HttpGet("")]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: Trainings/5
        [HttpGet("{name}")]
        public string Get(int id)
        {
            return "value";
        }
        
        // POST: Trainings
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }
        
        // PUT: Trainings/5
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> Put([FromBody]CreateFullTraining command)
        {
            command.TrainingId = Guid.NewGuid();
            await CommandDispatcher.DispatchAsync(command);

            return Created($"/trainings/{command.TrainingId}", null);
        }
        
        // DELETE: Trainings/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
