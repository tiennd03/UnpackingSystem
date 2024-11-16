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
        private readonly IDapperRepository<Part, long> _upkscreen;

        public UnpackingAppService(IRepository<LupContModule, long> repo, 
                                   IDapperRepository<LupContModule, long> dapperRepo,
                                   IDapperRepository<Part, long> upkscreen)
        {
            _repo = repo;
            _dapperRepo = dapperRepo;
            _upkscreen = upkscreen;
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

        public async Task<List<PartListDto>> GetAllPartList(string partNo, string moduleNo, string status)
        {
            var a = await _upkscreen.QueryAsync<PartListDto>(
                @"select * from Part where (ISNULL(@partNo, '') = '' OR PartNo LIKE CONCAT('%', @partNo, '%')) and (ISNULL(@moduleNo, '') = '' OR ModuleNo LIKE CONCAT('%', @moduleNo, '%')) and  (ISNULL(@status, '') = '' OR Status LIKE CONCAT('%', @status, '%'))", new
                {
                    partNo = partNo,
                    moduleNo = moduleNo,
                    status = status
                });
            return a.ToList();
        }

        public async Task<List<ModuleUpkPlanDto>> GetModulePlan()
        {
            string _sql = "Exec GET_MODULE_NO_PLAN ";
            IEnumerable<ModuleUpkPlanDto> _result = await _dapperRepo.QueryAsync<ModuleUpkPlanDto>(_sql, new { });
            return _result.ToList();

        }

        public async Task<List<PartInModuleDto>> GetPartInModule(string module_no)
        {
            string _sql = "Exec GET_PART_IN_MODULE @ModuleNo";
            IEnumerable<PartInModuleDto> _result = await _upkscreen.QueryAsync<PartInModuleDto>(_sql, new { ModuleNo = module_no });
            return _result.ToList();

        }

        public async Task FinishUpkModule(string module_no)
        {
            string _sql = "Exec FINISH_MODULE @ModuleNo";
            await _dapperRepo.QueryAsync<LupContModule>(_sql, new { ModuleNo = module_no });
        }
        public async Task FinishPart(long? id)
        {
            string sql = "UPDATE Part SET Status = 'FINISH' WHERE id = @Id";
            await _upkscreen.ExecuteAsync(sql, new
            {
                Id = id
            }); ;

        }

    }
}
