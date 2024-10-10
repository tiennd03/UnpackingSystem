using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace prod.Cmm.Bin.Dto
{
    public class CmmBinDto : EntityDto<long?>
    {
        public virtual string BinName { get; set; }
        public virtual string Description { get; set; }
        public virtual string BinType { get; set; }
        public virtual int? CreationMinAmount { get; set; }
        public virtual decimal? CreationFixedFee { get; set; }
        public virtual decimal? CreationPercentFee { get; set; }
        public virtual int? FundingMinAmount { get; set; }
        public virtual decimal? FundingFixedFee { get; set; }
        public virtual decimal? FundingPercentFee { get; set; }
    }

    public class CreateOrEditCmmBinDto : EntityDto<long?>
    {

        [StringLength(6)]
        public virtual string BinName { get; set; }
        [StringLength(2000)]
        public virtual string Description { get; set; }
        [StringLength(10)]
        public virtual string BinType { get; set; }
        public virtual int? CreationMinAmount { get; set; }
        public virtual decimal? CreationFixedFee { get; set; }
        public virtual decimal? CreationPercentFee { get; set; }
        public virtual int? FundingMinAmount { get; set; }
        public virtual decimal? FundingFixedFee { get; set; }
        public virtual decimal? FundingPercentFee { get; set; }
    }

    public class GetCmmBinDtoInput : PagedAndSortedResultRequestDto
    {
        public string BinName { get; set; }
        public string BinType { get; set; }
    }
}
