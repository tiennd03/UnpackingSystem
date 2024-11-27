using Abp.Application.Services;
using prod.Dto;
using prod.Master.Pc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace prod.Pc.PcHome.Exporting
{
    public interface IPcHomeExcelExporter : IApplicationService
    {
        FileDto ExportToFile(List<PcHomeDto> pchome);
    }
}
