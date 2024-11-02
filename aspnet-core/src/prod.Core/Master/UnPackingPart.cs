using Abp.Domain.Entities.Auditing;
using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace prod.Master
{
    [Table("UnPackingPart")]
    public class UnPackingPart : FullAuditedEntity<long>, IEntity<long>
    {
        public virtual string UnpackingNo { get; set; }
        public virtual string ModuleNo { get; set; }
        public virtual string Renban { get; set; }
        public virtual string SuppilerNo { get; set; }
        public virtual string ShiftNo { get; set; }
        public virtual DateTime? WorkingDate { get; set; }
        public virtual DateTime? PlanUnpackingDate { get; set; }
        public virtual DateTime? ActUnpackingDate { get; set; }
        public virtual DateTime? ActUnpackingDateFinish { get; set; }
        public virtual string UnpackingType { get; set; }
        public virtual string UnpackingStatus { get; set; }

    }
}
