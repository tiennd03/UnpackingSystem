﻿using Abp.Application.Services.Dto;
using Abp.Application.Services;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using prod.Master.Unpacking.Dto;

namespace prod.Master.Unpacking
{
    public interface IUnpackingAppService : IApplicationService
    {
        Task<List<UnpackingDto>> GetAll(GetUnpackingInput input);
        Task<List<ModuleUpkPlanDto>> GetModulePlan();
        Task<List<PartInModuleDto>> GetPartInModule(string module_no);

        //Task CreateOrEdit(CreateOrEditUnpackingDto input);

        //Task Delete(EntityDto<long> input);
    }
}
