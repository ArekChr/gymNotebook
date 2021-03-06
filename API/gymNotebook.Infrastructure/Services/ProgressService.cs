﻿using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using gymNotebook.Core.Domain;
using gymNotebook.Core.Repositories;
using gymNotebook.Infrastructure.DTO;

namespace gymNotebook.Infrastructure.Services
{
    public interface IProgressService : IService
    {
        Task<ProgressDto> GetAsync(Guid id);

        Task CreateAsync(Guid userId, DateTime createdAt, float? weight, float? biceps, float? chest, float? thigh, float? calf, float? waist, float? shoulders, float? neck);

        Task<ProgressListDto> BrowseAsync(Guid userId);

        Task UpdateAsync(Guid id, float weight, float biceps, float chest, float thigh, float calf, float waist, float shoulders, float neck);

        Task DeleteAsync(Guid id);
    }

    public class ProgressService : IProgressService
    {
        private readonly IProgressRepository _progressRepository;
        private readonly IMapper _mapper;

        public ProgressService(IProgressRepository progressRepository, IMapper mapper)
        {
            _progressRepository = progressRepository;
            _mapper = mapper;
        }

        public async Task<ProgressListDto> BrowseAsync(Guid userId)
        {
            var progress = await _progressRepository.BrowseAsync(userId);

            var enumerableProgress = _mapper.Map<IEnumerable<Progress>, IEnumerable<ProgressDto>>(progress);

            return new ProgressListDto(enumerableProgress);
        }

        public async Task CreateAsync(Guid userId, DateTime createdAt, float? weight, float? biceps, float? chest, float? thigh, float? calf, float? waist, float? shoulders, float? neck)
        {
            var progress = await _progressRepository.GetAsync(userId, createdAt);
            if(progress == null)
            {
                progress = new Progress(userId, createdAt, weight, biceps, chest, thigh, calf, waist, shoulders, neck);
                await _progressRepository.AddAsync(progress);
            }
            else
            {
                progress.OverrideProgress(weight, biceps, chest, thigh, calf, waist, shoulders, neck);
                await _progressRepository.UpdateAsync(progress);
            }
        }

        public async Task DeleteAsync(Guid id)
        {
            var training = await _progressRepository.GetAsync(id);
            if (training == null)
            {
                throw new Exception($"Progress with id: '{id}' does not exist.");
            }
            await _progressRepository.DeleteAsync(training);
        }

        public async Task<ProgressDto> GetAsync(Guid id)
        {
            var progress = await _progressRepository.GetAsync(id);

            return _mapper.Map<Progress, ProgressDto>(progress);
        }

        public async Task UpdateAsync(Guid id, float weight, float biceps, float chest, float thigh, float calf, float waist, float shoulders, float neck)
        {
            var progress = await _progressRepository.GetAsync(id);
            if (progress == null)
            {
                throw new Exception($"Progress with id: '{id}' does not exist.");
            }
            progress.UpdateProgress(weight, biceps, chest, thigh, calf, waist, shoulders, neck);
            await _progressRepository.UpdateAsync(progress);
        }
    }
}
