﻿using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.AspNetCore.Mvc.Authorization;
using Abp.Domain.Repositories;
using Abp.Organizations;
using Microsoft.AspNetCore.Mvc;
using prod.Authorization;
using prod.Notifications;
using prod.Organizations;
using prod.Web.Areas.App.Models.Notifications;
using prod.Web.Areas.App.Models.OrganizationUnits;
using prod.Web.Controllers;
using prod.Organizations.Dto;

namespace prod.Web.Areas.App.Controllers
{
    [Area("App")]
    [AbpMvcAuthorize]
    public class NotificationsController : prodControllerBase
    {
        private readonly INotificationAppService _notificationAppService;
        private readonly IOrganizationUnitAppService _organizationUnitAppService;

        public NotificationsController(
            INotificationAppService notificationAppService, 
            IOrganizationUnitAppService organizationUnitAppService)
        {
            _notificationAppService = notificationAppService;
            _organizationUnitAppService = organizationUnitAppService;
        }

        public ActionResult Index()
        {
            return View();
        }

        public async Task<PartialViewResult> SettingsModal()
        {
            var notificationSettings = await _notificationAppService.GetNotificationSettings();
            return PartialView("_SettingsModal", notificationSettings);
        }
        
        [AbpMvcAuthorize(AppPermissions.Pages_Administration_MassNotification_Create)]
        public async Task<PartialViewResult> CreateMassNotificationModal()
        {
            var viewModel = new CreateMassNotificationViewModel
            {
                TargetNotifiers = _notificationAppService.GetAllNotifiers()
            };

            return PartialView("_CreateMassNotificationModal", viewModel);
        }
        
        [AbpMvcAuthorize(AppPermissions.Pages_Administration_MassNotification)]
        public PartialViewResult UserLookupTableModal()
        {
            return PartialView("_UserLookupTableModal");
        }
        
        [AbpMvcAuthorize(AppPermissions.Pages_Administration_MassNotification)]
        public async Task<PartialViewResult> OrganizationUnitLookupTableModal()
        {
            var organizationUnits = await _organizationUnitAppService.GetAll();
            var model = new OrganizationUnitLookupTableModel
            {
                AllOrganizationUnits = ObjectMapper.Map<List<OrganizationUnitDto>>(organizationUnits)
            };
            
            return PartialView("_OrganizationUnitLookupTableModal", model);
        }
        
                
        [AbpMvcAuthorize(AppPermissions.Pages_Administration_MassNotification)]
        public ActionResult MassNotifications()
        {
            return View();
        }
    }
}