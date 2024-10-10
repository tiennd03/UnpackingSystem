using Abp.Domain.Entities.Auditing;
using Abp.Domain.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System;
using System.ComponentModel.DataAnnotations;

namespace prod.Cmm
{
    [Table("CmmBin")]
    public class CmmBin : FullAuditedEntity<long>, IEntity<long>
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
}
