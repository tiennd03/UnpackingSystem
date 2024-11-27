using prod.DataExporting.Excel.NPOI;
using prod.Dto;
using prod.Master.Robing.Dto;
using prod.Storage;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace prod.Master.Robing.Exporting
{
    public class RobingExcelExporter : NpoiExcelExporterBase, IRobingExcelExporter
    {
        public RobingExcelExporter(ITempFileCacheManager tempFileCacheManager) : base(tempFileCacheManager) { }
        public FileDto ExportToFile(List<RobingDto> unpacking)
        {
            return CreateExcelPackage(
                "Robing.xlsx",
                excelPackage =>
                {
                    var sheet = excelPackage.CreateSheet("Robing");
                    AddHeader(
                                sheet,
                                    ("PartNo"),
                                    ("PartName"),
                                    ("ModuleNo"),
                                    ("Supplier"),
                                    ("Renban"),
                                    ("Type"),
                                    ("Description")
                                   );
                    AddObjects(
                         sheet, 1, unpacking,
                                _ => _.PartNo,
                                _ => _.PartName,
                                _ => _.ModuleNo,
                                _ => _.Supplier,
                                _ => _.Renban,
                                _ => _.Type,
                                _ => _.Description

                                );

                    for (var i = 0; i < 8; i++)
                    {
                        sheet.AutoSizeColumn(i);
                    }
                });
        }
    }
}
