using Abp.Dependency;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace prod.Web.Startup
{
    public class prodServiceProviderIsService: IServiceProviderIsService, ISingletonDependency
    {
        private readonly IIocManager _iocManager;

        public prodServiceProviderIsService(IIocManager iocManager)
        {
            _iocManager = iocManager;
        }

        public bool IsService(Type serviceType)
        {
            return _iocManager.IsRegistered(serviceType);
        }
    }
}
