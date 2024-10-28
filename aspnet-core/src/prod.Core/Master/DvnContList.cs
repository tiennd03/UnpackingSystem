using Abp.Domain.Entities.Auditing;
using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace prod.Master
{
    [Table("DvnContList")]
    public class DvnContList : FullAuditedEntity<long>, IEntity<long>
    {
        public const int MaxDevaningNoLength = 50;

        public const int MaxContainerNoLength = 50;

        public const int MaxRenbanLength = 50;

        public const int MaxSuppilerNoLength = 50;

        public const int MaxShiftNoLength = 20;

        public const int MaxDevaningTypeLength = 20;

        public const int MaxDevaningStatusLength = 20;

        [StringLength(MaxDevaningNoLength)]
        public virtual string DevaningNo { get; set; }

        [StringLength(MaxContainerNoLength)]
        public virtual string ContainerNo { get; set; }

        [StringLength(MaxRenbanLength)]
        public virtual string Renban { get; set; }

        [StringLength(MaxSuppilerNoLength)]
        public virtual string SuppilerNo { get; set; }

        [StringLength(MaxShiftNoLength)]
        public virtual string ShiftNo { get; set; }

        public virtual DateTime? WorkingDate { get; set; }

        public virtual DateTime? PlanDevaningDate { get; set; }
        public virtual DateTime? ActDevaningDate { get; set; }
        public virtual DateTime? ActDevaningDateFinish { get; set; }

        [StringLength(MaxDevaningTypeLength)]
        public virtual string DevaningType { get; set; }

        [StringLength(MaxDevaningStatusLength)]
        public virtual string DevaningStatus { get; set; }
    }
}
