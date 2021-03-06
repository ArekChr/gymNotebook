﻿using System;
using System.Collections.Generic;
using System.Text;

namespace gymNotebook.Infrastructure.Commands.Trainings.Exercises
{
    public class UpdateExercise : AuthenticatedCommandBase
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string MusclePart { get; set; }
    }
}
