using Abp.Application.Services;
using prod.Dto;
using prod.Master.Pc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace prod.Pc.PcStore.Exporting
{
    public interface IPcStoreExcelExporter : IApplicationService
    {
        FileDto ExportToFile(List<PcStoreDto> pcStore);
    }
}
