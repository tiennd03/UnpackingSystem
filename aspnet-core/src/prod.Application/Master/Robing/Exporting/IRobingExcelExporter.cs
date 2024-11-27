using Abp.Application.Services;
using prod.Dto;
using prod.Master.Robing.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace prod.Master.Robing.Exporting
{
    public interface IRobingExcelExporter : IApplicationService

    {
        FileDto ExportToFile(List<RobingDto> robing);

    }
}
