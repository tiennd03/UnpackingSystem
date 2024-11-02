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
    [Table("PcStore")]
    public class PcStore : FullAuditedEntity<long>, IEntity<long>
    {
        public virtual string PartNo { get; set; }
        public virtual string PartName { get; set; }

    }

}