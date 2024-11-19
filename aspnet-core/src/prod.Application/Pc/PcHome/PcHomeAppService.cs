﻿using Abp.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace prod.Master.Pc
{
    public class PcHomeAppService : prodAppServiceBase, IPcHomeAppService
    {
        private readonly IRepository<PcHome, long> _repo;
        public PcHomeAppService(IRepository<PcHome, long> repo)
        {
            _repo = repo;
        }

        public async Task<List<PcHomeDto>> GetAll(PcHomeInputDto input)
        {
            var query = _repo.GetAll().AsNoTracking()
                .Where(e => string.IsNullOrWhiteSpace(input.PartNo) || e.PartNo.Contains(input.PartNo))
                .Select(PcHome => new PcHomeDto
                {
                    Id = PcHome.Id,
                    PartNo = PcHome.PartNo,
                    PartName = PcHome.PartName,
                });

            return await query.ToListAsync();
        }
    }
}
