using Abp.Application.Services;
using Abp.Application.Services.Dto;
using prod.Master.DevaningModule.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace prod.Master.DevaningModule
{
    public interface IDevaningModuleAppService : IApplicationService
    {
        Task<List<DevaningModuleDto>> GetAll(GetDevaningContModuleInput input);
        Task UpdateOrCreate(DevaningModuleDto input);
        Task Delete(List<int> deleteUsers);
        Task FinishDvnCont(int dvn_id);
        Task UpdateStatusToDevaning(long devaningId);
    }
}
