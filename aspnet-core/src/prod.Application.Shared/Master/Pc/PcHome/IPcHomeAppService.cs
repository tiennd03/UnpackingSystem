using Abp.Application.Services;
using prod.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace prod.Master.Pc
{
    public interface IPcHomeAppService : IApplicationService
    {
        Task<List<PcHomeDto>> GetAll(PcHomeInputDto input);

        //Task<FileDto> GetPcHomeToExcel(PcHomeInputDto input);
    }
}
