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
        public DevaningModuleAppService(IRepository<DvnContList, long> repo,
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
        //private async Task Create(DevaningModuleDto input)
        //{
        //    var DevaningModule = ObjectMapper.Map<DvnContList>(input);
        //    await _repo.InsertAsync(DevaningModule);
        //}
        private async Task<long> Create(DevaningModuleDto input)
        {
            try
            {
                string sql = "Exec spCreateDevaning " +
                             "@p_DevaningNo, " +
                             "@p_ContainerNo, " +
                             "@p_Renban, " +
                             "@p_SuppilerNo, " +
                             "@p_ShiftNo, " +
                             "@p_WorkingDate, " +
                             "@p_PlanDevaningDate, " +
                             "@p_ActDevaningDate, " +
                             "@p_ActDevaningDateFinish, " +
                             "@p_DevaningType, " +
                             "@p_DevaningStatus, " +
                             "@p_login_id";
                var result = await _dapperRepo.QueryAsync<DevaningNewIdDto>(sql, new
                {
                    p_DevaningNo = input.DevaningNo,
                    p_ContainerNo = input.ContainerNo,
                    p_Renban = input.Renban,
                    p_SuppilerNo = input.SuppilerNo,
                    p_ShiftNo = input.ShiftNo,
                    p_WorkingDate = input.WorkingDate,
                    p_PlanDevaningDate = input.PlanDevaningDate,
                    p_ActDevaningDate = input.ActDevaningDate,
                    p_ActDevaningDateFinish = input.ActDevaningDateFinish,
                    p_DevaningType = input.DevaningType,
                    p_DevaningStatus = input.DevaningStatus,
                    p_login_id = AbpSession.UserId
                });
                long p_id = result.FirstOrDefault()?.Id ?? 0;
                return p_id;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        //Edit
        private async Task Update(DevaningModuleDto input)
        {
            try
            {
                string sql = "Exec spUpdateDevaning " +
                             "@p_Id, " +
                             "@p_DevaningNo, " +
                             "@p_ContainerNo, " +
                             "@p_Renban, " +
                             "@p_SuppilerNo, " +
                             "@p_ShiftNo, " +
                             "@p_WorkingDate, " +
                             "@p_PlanDevaningDate, " +
                             "@p_ActDevaningDate, " +
                             "@p_ActDevaningDateFinish, " +
                             "@p_DevaningType, " +
                             "@p_DevaningStatus, " +
                             "@p_login_id";
                var result = await _dapperRepo.QueryAsync<DevaningNewIdDto>(sql, new
                {
                    p_Id = input.Id,
                    p_DevaningNo = input.DevaningNo,
                    p_ContainerNo = input.ContainerNo,
                    p_Renban = input.Renban,
                    p_SuppilerNo = input.SuppilerNo,
                    p_ShiftNo = input.ShiftNo,
                    p_WorkingDate = input.WorkingDate,
                    p_PlanDevaningDate = input.PlanDevaningDate,
                    p_ActDevaningDate = input.ActDevaningDate,
                    p_ActDevaningDateFinish = input.ActDevaningDateFinish,
                    p_DevaningType = input.DevaningType,
                    p_DevaningStatus = input.DevaningStatus,
                    p_login_id = AbpSession.UserId
                });
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        //Delete

        public async Task Delete(List<int> deleteUsers)
        {
            try
            {
                var ids = string.Join(",", deleteUsers);
                await _dapperRepo.ExecuteAsync(@" exec [dbo].[spDeleteDevaning] @pIds, @pUserId ", new
                {
                    pIds = ids,
                    pUserId = AbpSession.UserId
                }); ;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.ToString());
            }
        }

        public async Task FinishDvnCont(int dvn_id)
        {
            string _sql = "Exec DEVANT_MODULE @IdDevant";
            await _dapperRepo.QueryAsync<DevaningModuleDto>(_sql, new { IdDevant = dvn_id });
        }

        public async Task<List<CoutPlanDvn>> GetDevaningPlan()
        {
            string _sqlSearch = "Exec COUNT_DEVANING_WORKINGDATE";

            IEnumerable<CoutPlanDvn> _result = await _dapperRepo.QueryAsync<CoutPlanDvn>(_sqlSearch, new { });
            return _result.ToList();
        }

        public async Task UpdateStatusToDevaning(long devaningId)
        {
            try
            {
                string sql = "Exec spUpdateStatusToDevaning @p_Id";
                await _dapperRepo.ExecuteAsync(sql, new { p_Id = devaningId });
            }
            catch (Exception ex)
            {
                throw new Exception("Không thể cập nhật trạng thái: " + ex.Message);
            }
        }
    }
}
