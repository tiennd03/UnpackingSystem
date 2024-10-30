using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Dapper.Repositories;
using Abp.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using prod.Authorization;
using prod.Master.DevaningModule.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace prod.Master.DevaningModule
{
   
    [AbpAuthorize(AppPermissions.Pages_UPS_Devaning)]
    public class DevaningModuleAppService : prodAppServiceBase, IDevaningModuleAppService
    {
        private readonly IRepository<DvnContList, long> _repo;
        private readonly IDapperRepository<DvnContList, long> _dapperRepo;
        public DevaningModuleAppService (IRepository<DvnContList, long> repo, 
                                         IDapperRepository<DvnContList, long> dapperRepo)
        {
            _repo = repo;
            _dapperRepo = dapperRepo;
        }

        public async Task<List<DevaningModuleDto>> GetAll(GetDevaningContModuleInput input)
        {
            try
            {
                string sql = "exec spGetDataDevaning @pStatus";

                IEnumerable<DevaningModuleDto> result = await _dapperRepo.QueryAsync<DevaningModuleDto>(sql, new
                {
                    pStatus = input.Status,
                });

                return result.ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.ToString());
            }

        }

        public async Task UpdateOrCreate(DevaningModuleDto input)
        {
            if (input.Id == null)
            {
                await Create(input);
            }
            else
            {
                await Update(input);
            }
        }

        //ADD
        private async Task Create(DevaningModuleDto input)
        {
            var DevaningModule = ObjectMapper.Map<DvnContList>(input);
            await _repo.InsertAsync(DevaningModule);
        }

        //Edit
        private async Task Update(DevaningModuleDto input)
        {
            var DevaningModule = await _repo.FirstOrDefaultAsync((long)input.Id);
            ObjectMapper.Map(input, DevaningModule);
            await _repo.UpdateAsync(DevaningModule);
        }
    }
}
