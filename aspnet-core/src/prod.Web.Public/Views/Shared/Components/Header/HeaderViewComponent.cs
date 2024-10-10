﻿using System.Linq;
using System.Threading.Tasks;
using Abp.Application.Navigation;
using Abp.Configuration;
using Abp.Configuration.Startup;
using Abp.Extensions;
using Abp.Localization;
using Abp.Runtime.Session;
using Microsoft.AspNetCore.Mvc;
using prod.Configuration;
using prod.MultiTenancy;
using prod.UiCustomization;
using prod.Url;
using prod.Web.Public.Startup;
using prod.Web.Session;
using prod.Web.UiCustomization;

namespace prod.Web.Public.Views.Shared.Components.Header
{
    public class HeaderViewComponent : prodViewComponent
    {
        private readonly IUserNavigationManager _userNavigationManager;
        private readonly IMultiTenancyConfig _multiTenancyConfig;
        private readonly IAbpSession _abpSession;
        private readonly ILanguageManager _languageManager;
        private readonly ISettingManager _settingManager;
        private readonly IPerRequestSessionCache _sessionCache;
        private readonly IWebUrlService _webUrlService;
        private readonly TenantManager _tenantManager;
        private readonly IUiThemeCustomizerFactory _uiThemeCustomizerFactory;
        
        public HeaderViewComponent(
            IUserNavigationManager userNavigationManager, 
            IMultiTenancyConfig multiTenancyConfig,
            IAbpSession abpSession,
            ILanguageManager languageManager, 
            ISettingManager settingManager, 
            IPerRequestSessionCache sessionCache,
            IWebUrlService webUrlService, 
            TenantManager tenantManager, 
            IUiThemeCustomizerFactory uiThemeCustomizerFactory)
        {
            _userNavigationManager = userNavigationManager;
            _multiTenancyConfig = multiTenancyConfig;
            _abpSession = abpSession;
            _languageManager = languageManager;
            _settingManager = settingManager;
            _sessionCache = sessionCache;
            _webUrlService = webUrlService;
            _tenantManager = tenantManager;
            _uiThemeCustomizerFactory = uiThemeCustomizerFactory;
        }

        public async Task<IViewComponentResult> InvokeAsync(string currentPageName = "")
        {
            var tenancyName = "";
            if (_abpSession.TenantId.HasValue)
            {
                var tenant = await _tenantManager.GetByIdAsync(_abpSession.GetTenantId());
                tenancyName = tenant.TenancyName;
            }

            var headerModel = new HeaderViewModel
            {
                LoginInformations = await _sessionCache.GetCurrentLoginInformationsAsync(),
                IsInHostView = !_abpSession.TenantId.HasValue,
                Languages = _languageManager.GetActiveLanguages().ToList(),
                CurrentLanguage = _languageManager.CurrentLanguage,
                Menu = await _userNavigationManager.GetMenuAsync(FrontEndNavigationProvider.MenuName, _abpSession.ToUserIdentifier()),
                CurrentPageName = currentPageName,
                IsMultiTenancyEnabled = _multiTenancyConfig.IsEnabled,
                TenantRegistrationEnabled = await _settingManager.GetSettingValueAsync<bool>(AppSettings.TenantManagement.AllowSelfRegistration),
                AdminWebSiteRootAddress = _webUrlService.GetServerRootAddress(tenancyName).EnsureEndsWith('/'),
                WebSiteRootAddress = _webUrlService.GetSiteRootAddress(tenancyName).EnsureEndsWith('/'),
                LogoSkin = await GetLogoSkin()
            };

            return View(headerModel);
        }
        
        private async Task<string> GetLogoSkin()
        {
            var themeCustomizer = await _uiThemeCustomizerFactory.GetCurrentUiCustomizer();
            var theme = await themeCustomizer.GetUiSettings();
            if (theme.IsTopMenuUsed || theme.IsTabMenuUsed)
            {
                return theme.BaseSettings.Layout.DarkMode ? "light" : "dark";
            }

            return theme.BaseSettings.Menu.AsideSkin;
        }
    }
}
