using Abp.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using prod.Dto;
using prod.Master.Pc;
using prod.Pc.PcStore.Exporting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace prod.Master
{
    public class PcStoreAppService : prodAppServiceBase, IPcStoreAppService
    {
        private readonly IRepository<PcStore, long> _repo;
        private readonly IPcStoreExcelExporter _calendarListExcelExporter;
        public PcStoreAppService(IRepository<PcStore, long> repo, 
                                 IPcStoreExcelExporter calendarListExcelExporter)
        {
            _repo = repo;
            _calendarListExcelExporter = calendarListExcelExporter;
        }

        public async Task<List<PcStoreDto>> GetAll(PcStoreInputDto input)
        {
            var query = _repo.GetAll().AsNoTracking()
                .Where(e => string.IsNullOrWhiteSpace(input.PartNo) || e.PartNo.Contains(input.PartNo))
                .Select(PcStore => new PcStoreDto
                {
                    Id = PcStore.Id,
                    PartNo = PcStore.PartNo,
                    PartName = PcStore.PartName,
                });

            return await query.ToListAsync();
        }

        //public async Task<FileDto> GetPcStoreToExcel(PcStoreInputDto input)
        //{
        //    var query = _repo.GetAll().AsNoTracking()
        //         .Where(e => string.IsNullOrWhiteSpace(input.PartNo) || e.PartNo.Contains(input.PartNo))
        //         .Select(PcStore => new PcStoreDto
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

