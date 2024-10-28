using Abp.Application.Services;
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
    }
}
