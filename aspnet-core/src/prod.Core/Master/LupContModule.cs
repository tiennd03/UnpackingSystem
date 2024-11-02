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
    [Table("LupContModule")]
    public class LupContModule : FullAuditedEntity<long>, IEntity<long>
    {
        public virtual string ModuleNo { get; set; }
        public virtual string DevaningNo { get; set; }
        public virtual string Supplier { get; set; }
        public virtual string Renban { get; set; }
        public virtual DateTime? PlanUnpackingDate { get; set; }
        public virtual DateTime? ActUnpackingDate { get; set; }
        public virtual DateTime? ActUnpackingDateFinish { get; set; }
        public virtual string ModuleStatus { get; set; }

    }
}
