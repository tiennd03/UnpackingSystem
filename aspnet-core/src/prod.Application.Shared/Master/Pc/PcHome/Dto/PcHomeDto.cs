using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace prod.Master.Pc.PcHome.Dto
{
    public class PcHomeDto : Entity<long>
    {
        public string PartNo { get; set; }

        public string PartName { get; set; }

    }
    public class PcHomeInputDto
    {

        public string PartNo { get; set; }

        public string PartName { get; set; }

    }
}
