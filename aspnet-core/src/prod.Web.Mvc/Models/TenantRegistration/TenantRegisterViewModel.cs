﻿using prod.Editions;
using prod.Editions.Dto;
using prod.MultiTenancy.Payments;
using prod.Security;
using prod.MultiTenancy.Payments.Dto;

namespace prod.Web.Models.TenantRegistration
{
    public class TenantRegisterViewModel
    {
        public PasswordComplexitySetting PasswordComplexitySetting { get; set; }

        public int? EditionId { get; set; }

        public SubscriptionStartType? SubscriptionStartType { get; set; }

        public EditionSelectDto Edition { get; set; }

        public EditionPaymentType EditionPaymentType { get; set; }
    }
}
