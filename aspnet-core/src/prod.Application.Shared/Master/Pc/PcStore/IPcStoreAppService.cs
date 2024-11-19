using Abp.Application.Services;
using prod.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace prod.Master.Pc
{
    public interface IPcStoreAppService : IApplicationService
    {
        Task<List<PcStoreDto>> GetAll(PcStoreInputDto input);
        //Task<FileDto> GetPcStoreToExcel(PcStoreInputDto input);

    }
}
