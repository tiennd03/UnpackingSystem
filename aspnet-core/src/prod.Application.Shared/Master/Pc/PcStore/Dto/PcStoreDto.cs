using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace prod.Master.Pc.PcStore.Dto
{
    public class PcStoreDto : Entity<long>
    {
        public string PartNo { get; set; }

        public string PartName { get; set; }

    }
    public class PcStoreInputDto
    {

        public string PartNo { get; set; }

        public string PartName { get; set; }

    }
}
