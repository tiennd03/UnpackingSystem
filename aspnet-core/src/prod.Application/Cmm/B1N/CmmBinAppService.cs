using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Dapper.Repositories;
using Abp.Domain.Repositories;
using Abp.Domain.Uow;
using Abp.EntityFrameworkCore.Uow;
using Abp.Linq.Extensions;
using Microsoft.EntityFrameworkCore;
using prod.Authorization;
using prod.Cmm.Bin.Dto;
using prod.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace prod.Cmm.Bin
{
    [AbpAuthorize(AppPermissions.Pages_Cmm_Bin)]
    public class CmmBinAppService : prodAppServiceBase, ICmmBinAppService
    {
        private readonly IRepository<CmmBin, long> _repo;

        public CmmBinAppService(IRepository<CmmBin, long> repo
        )
        {
            _repo = repo;
        }

        [AbpAuthorize(AppPermissions.Pages_Cmm_Bin_CreateEdit)]
        public async Task CreateOrEdit(CreateOrEditCmmBinDto input)
        {
            if (input.Id == null) await Create(input);
            else await Update(input);
        }

        //CREATE
        private async Task Create(CreateOrEditCmmBinDto input)
        {
            var mainObj = ObjectMapper.Map<CmmBin>(input);

            await CurrentUnitOfWork.GetDbContext<prodDbContext>().AddAsync(mainObj);
        }

        // EDIT
        private async Task Update(CreateOrEditCmmBinDto input)
        {
            using (CurrentUnitOfWork.DisableFilter(AbpDataFilters.MayHaveTenant))
            {
                var mainObj = await _repo.GetAll()
                .FirstOrDefaultAsync(e => e.Id == input.Id);

                var mainObjToUpdate = ObjectMapper.Map(input, mainObj);
            }
        }

        [AbpAuthorize(AppPermissions.Pages_Cmm_Bin_CreateEdit)]
        public async Task Delete(EntityDto input)
        {
            var mainObj = await _repo.FirstOrDefaultAsync(input.Id);
            _repo.HardDelete(mainObj);
            CurrentUnitOfWork.GetDbContext<prodDbContext>().Remove(mainObj);
        }

        public async Task<PagedResultDto<CmmBinDto>> GetAll(GetCmmBinDtoInput input)
        {
            var filtered = _repo.GetAll()
                .WhereIf(!string.IsNullOrWhiteSpace(input.BinName), e => e.BinName.Contains(input.BinName))
                .WhereIf(!string.IsNullOrWhiteSpace(input.BinType), e => e.BinType.Contains(input.BinType))
                ;
            var pageAndFiltered = filtered.OrderBy(s => s.Id);

            var system = from o in pageAndFiltered
                         select new CmmBinDto
                         {
                             Id = o.Id,
                             BinName = o.BinName,
                             Description = o.Description,
                             BinType = o.BinType,
                             CreationMinAmount = o.CreationMinAmount,
                             CreationFixedFee = o.CreationFixedFee,
                             CreationPercentFee = o.CreationPercentFee,
                             FundingMinAmount = o.FundingMinAmount,
                             FundingFixedFee = o.FundingFixedFee,
                             FundingPercentFee = o.FundingPercentFee
                         };
            var totalCount = await filtered.CountAsync();
            var paged = system.PageBy(input);

            return new PagedResultDto<CmmBinDto>(
                totalCount,
                 await paged.ToListAsync()
            );
        }
    }
}
