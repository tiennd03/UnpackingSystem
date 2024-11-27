using Abp.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using prod.Dto;
using prod.Master.Pc;
using prod.Pc.PcHome.Exporting;
using prod.Pc.PcStore.Exporting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace prod.Master.Pc
{
    public class PcHomeAppService : prodAppServiceBase, IPcHomeAppService
    {
        private readonly IRepository<PcHome, long> _repo;
        private readonly IPcHomeExcelExporter _calendarListExcelExporter;
        public PcHomeAppService(IRepository<PcHome, long> repo,
                                IPcHomeExcelExporter calendarListExcelExporter)
        {
            _repo = repo;
            _calendarListExcelExporter = calendarListExcelExporter;
        }

        public async Task<List<PcHomeDto>> GetAll(PcHomeInputDto input)
        {
            var query = _repo.GetAll().AsNoTracking()
                .Where(e => string.IsNullOrWhiteSpace(input.PartNo) || e.PartNo.Contains(input.PartNo))
                .Select(PcHome => new PcHomeDto
                {
                    Id = PcHome.Id,
                    PartNo = PcHome.PartNo,
                    PartName = PcHome.PartName,
                });

            return await query.ToListAsync();
        }

        //public async Task<FileDto> GetPcHomeToExcel(PcHomeInputDto input)
        //{
        //    var query = _repo.GetAll().AsNoTracking()
        //         .Where(e => string.IsNullOrWhiteSpace(input.PartNo) || e.PartNo.Contains(input.PartNo))
        //         .Select(PcStore => new PcHomeDto
        //         {
        //             Id = PcStore.Id,
        //             PartNo = PcStore.PartNo,
        //             PartName = PcStore.PartName,
        //         });
        //    var exportToExcel = await query.ToListAsync();
        //    return _calendarListExcelExporter.ExportToFile(exportToExcel);
        //}
    }
}
