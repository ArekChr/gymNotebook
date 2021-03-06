﻿using gymNotebook.Core.Domain;
using gymNotebook.Infrastructure.Commands;
using System;

namespace gymNotebook.Infrastructure.DTO
{
    public class FriendDto : IResult
    {
        public Guid UserId { get; set; }

        public Guid FriendId { get; set; }

        public Status? FriendStatus { get; set; }
    }
}
