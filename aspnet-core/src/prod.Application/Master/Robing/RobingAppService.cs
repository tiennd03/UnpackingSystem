﻿using Abp.Authorization;
using Abp.Dapper.Repositories;
using Abp.Domain.Repositories;
using prod.Authorization;
using prod.Dto;
using prod.Master.Robing.Dto;
using prod.Master.Robing.Exporting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace prod.Master.Robing
{
    [AbpAuthorize(AppPermissions.Pages_UPS_Robing)]
    public class RobingAppService : prodAppServiceBase, IRobingAppService
    {
        private readonly IRepository<Robings, long> _repo;
        private readonly IDapperRepository<Robings, long> _dapperRepo;
        private readonly IRobingExcelExporter _calendarListExcelExporter;
        public RobingAppService(IRepository<Robings, long> repo, 
                                IDapperRepository<Robings, long> dapperRepo)
        {
            _repo = repo;
            _dapperRepo = dapperRepo;
        }

        [AbpAuthorize(AppPermissions.Pages_UPS_Robing_Request)]
        public async Task RequestGiveBack(long? id)
        {
            string sql = "UPDATE Robing SET Type = 'PENDING' WHERE id = @Id";
            await _dapperRepo.ExecuteAsync(sql, new
            {
                Id = id
            }); ;

        }

        public async Task<List<RobingDto>> GetAllRobing(string partNo)
        {
            var a = await _dapperRepo.QueryAsync<RobingDto>(@"select * from Robing where (ISNULL(@partNo, '') = '' OR PartNo LIKE CONCAT('%', @partNo, '%'))", new
            {
                partNo = partNo
            });
            return a.ToList();
        }

        public async Task<FileDto> GetRobingToExcel(string partNo)
        {
            var a = await _dapperRepo.QueryAsync<RobingDto>(@"select * from Robing where (ISNULL(@partNo, '') = '' OR PartNo LIKE CONCAT('%', @partNo, '%'))", new
            {
                partNo = partNo
            });
            var exportToExcel = a.ToList();
            return _calendarListExcelExporter.ExportToFile(exportToExcel);
        }
    }
}
