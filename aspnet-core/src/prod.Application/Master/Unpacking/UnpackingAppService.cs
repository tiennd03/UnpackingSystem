using Abp.Dapper.Repositories;
using Abp.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using prod.Master.DevaningModule;
using prod.Master.Unpacking.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace prod.Master.Unpacking
{
    public class UnpackingAppService : prodAppServiceBase, IUnpackingAppService
    {
        private readonly IRepository<LupContModule, long> _repo;
        private readonly IDapperRepository<LupContModule, long> _dapperRepo;

        public UnpackingAppService(IRepository<LupContModule, long> repo, 
                                   IDapperRepository<LupContModule, long> dapperRepo)
        {
            _repo = repo;
            _dapperRepo = dapperRepo;
        }

        public async Task<List<UnpackingDto>> GetAll(GetUnpackingInput input)
        {
            var query = _repo.GetAll().AsNoTracking()
                .Where(e => string.IsNullOrWhiteSpace(input.ModuleNo) || e.ModuleNo.Contains(input.ModuleNo))
                .Where(e => string.IsNullOrWhiteSpace(input.ModuleStatus) || e.ModuleStatus.Contains(input.ModuleStatus))
                .Select(LupContModule => new UnpackingDto
                {
                    Id = LupContModule.Id,
                    ModuleNo = LupContModule.ModuleNo,
                    DevaningNo = LupContModule.DevaningNo,
                    Renban = LupContModule.Renban,
                    Supplier = LupContModule.Supplier,
                    ActUnpackingDate = LupContModule.ActUnpackingDate,
                    ActUnpackingDateFinish = LupContModule.ActUnpackingDateFinish,
                    PlanUnpackingDate = LupContModule.PlanUnpackingDate,
                    ModuleStatus = LupContModule.ModuleStatus,
                });

            return await query.ToListAsync();
        }

    }
}
