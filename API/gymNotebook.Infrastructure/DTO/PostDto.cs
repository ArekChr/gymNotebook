﻿using gymNotebook.Infrastructure.Commands;
using System;
using System.Collections.Generic;

namespace gymNotebook.Infrastructure.DTO
{
    public class PostDto : IResult
    {
        public Guid UserId { get; set; }
        public string Description { get; set; }
        public Guid ImageId { get; set; }
        public int Likes { get; set; }
        public DateTime CreatedAt { get; set; }
        public ImageDto Image { get; set; }
        public IList<CommentDto> Comments { get; set; }
    }
}
