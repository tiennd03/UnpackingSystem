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
    [Table("LgwContainer")]
    public class LgwContainer : FullAuditedEntity<long>, IEntity<long>
    {
        public virtual string ContainerNo { get; set; }
        public virtual string Renban { get; set; }
        public virtual string SuppilerNo { get; set; }

    }
}
