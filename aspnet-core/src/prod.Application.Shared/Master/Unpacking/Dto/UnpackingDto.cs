using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace prod.Master.Unpacking.Dto
{
    public class UnpackingDto : Entity<long?>
    {
        public string ModuleNo { get; set; }

        public string DevaningNo { get; set; }

        public string Renban { get; set; }
        public string Supplier { get; set; }


        public DateTime? PlanUnpackingDate { get; set; }
        public DateTime? ActUnpackingDate { get; set; }
        public DateTime? ActUnpackingDateFinish { get; set; }

        public string ModuleStatus { get; set; }
    }
    public class PartInModuleDto : Entity<long?>
    {
        public long Id { get; set; }
        public string ModuleNo { get; set; }
        public string PartNo { get; set; }

        public string PartName { get; set; }

        public string Renban { get; set; }

        public string Supplier { get; set; }

        public string Status { get; set; }
    }
    public class ModuleUpkPlanDto : Entity<long?>
    {
        public string ModuleNo { get; set; }
        public string ModuleStatus { get; set; }


    }
    public class PartListDto : Entity<long?>
    {
        public string PartNo { get; set; }
        public string ModuleNo { get; set; }
        public string PartName { get; set; }
        public string Renban { get; set; }
        public string Supplier { get; set; }
        public string Status { get; set; }
    }

}
