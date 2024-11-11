using Abp.Application.Services.Dto;
using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace prod.Master.DevaningModule.Dto
{
    public class DevaningModuleDto : Entity<long?>
    {
        public string DevaningNo { get; set; }

        public string ContainerNo { get; set; }

        public string Renban { get; set; }
        public string SuppilerNo { get; set; }
        public string ShiftNo { get; set; }

        public DateTime? WorkingDate { get; set; }

        public DateTime? PlanDevaningDate { get; set; }
        public DateTime? ActDevaningDate { get; set; }
        public DateTime? ActDevaningDateFinish { get; set; }

        public string DevaningType { get; set; }

        public string DevaningStatus { get; set; }
    }

    public class DevaningNewIdDto 
    {
        public virtual long Id { get; set; }
    }

    public class GetDevaningContModuleInput
    {
        public virtual int Status { get; set; }
    }

    public class CoutPlanDvn : EntityDto<long?>
    {
        public int Id { get; set; }
        public string DevaningNo { get; set; }
        public string ContainerNo { get; set; }
        public string DevaningStatus { get; set; }
        public string Renban { get; set; }
        public DateTime? ActDevaningDate { get; set; }
        public DateTime? ActDevaningDateFinish { get; set; }
        public DateTime? PlanDevaningDate { get; set; }
    }
}
