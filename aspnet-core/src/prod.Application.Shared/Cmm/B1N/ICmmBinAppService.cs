using Abp.Application.Services;
using Abp.Application.Services.Dto;
using prod.Cmm.Bin.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace prod.Cmm.Bin
{
    public interface ICmmBinAppService : IApplicationService
    {
        Task<PagedResultDto<CmmBinDto>> GetAll(GetCmmBinDtoInput input);
    }
}
