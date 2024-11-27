using prod.DataExporting.Excel.NPOI;
using prod.Dto;
using prod.Master.Pc;
using prod.Storage;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace prod.Pc.PcHome.Exporting
{
    public class PcHomeExcelExporter : NpoiExcelExporterBase, IPcHomeExcelExporter
    {
        public PcHomeExcelExporter(ITempFileCacheManager tempFileCacheManager) : base(tempFileCacheManager) { }
        public FileDto ExportToFile(List<PcHomeDto> pchome)
        {
            return CreateExcelPackage(
                "PcHome.xlsx",
                excelPackage =>
                {
                    var sheet = excelPackage.CreateSheet("DevaningContModule");
                    AddHeader(
                                sheet,
                                    "PartNo",
                                    "PartName"
                                   );
                    AddObjects(
                         sheet, 1, pchome,
                                _ => _.PartNo,
                                _ => _.PartName

                                );

                    for (var i = 0; i < 8; i++)
                    {
                        sheet.AutoSizeColumn(i);
                    }
                });
        }
    }
}
