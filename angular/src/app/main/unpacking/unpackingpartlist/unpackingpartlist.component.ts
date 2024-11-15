import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DashboardCustomizationConst } from '@app/shared/common/customizable-dashboard/DashboardCustomizationConsts';

@Component({
    templateUrl: './unpackingpartlist.component.html',
    styleUrls: ['./unpackingpartlist.component.less'],
    encapsulation: ViewEncapsulation.None,
})
export class UnpackingPartlistComponent extends AppComponentBase {
    dashboardName = DashboardCustomizationConst.dashboardNames.defaultTenantDashboard;

    constructor(injector: Injector) {
        super(injector);
    }
}
