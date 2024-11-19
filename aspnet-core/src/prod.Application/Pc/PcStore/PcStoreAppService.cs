using Abp.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace prod.Master.Pc
{
    public class PcStoreAppService : prodAppServiceBase, IPcStoreAppService
    {
        private readonly IRepository<PcStore, long> _repo;
        public PcStoreAppService(IRepository<PcStore, long> repo)
        {
            _repo = repo;
        }

        public async Task<List<PcStoreDto>> GetAll(PcStoreInputDto input)
        {
            var query = _repo.GetAll().AsNoTracking()
                .Where(e => string.IsNullOrWhiteSpace(input.PartNo) || e.PartNo.Contains(input.PartNo))
                .Select(PcStore => new PcStoreDto
                {
                    Id = PcStore.Id,
                    PartNo = PcStore.PartNo,
                    PartName = PcStore.PartName,
                });

            return await query.ToListAsync();
        }
    }
}

