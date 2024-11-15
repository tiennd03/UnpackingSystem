import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DashboardCustomizationConst } from '@app/shared/common/customizable-dashboard/DashboardCustomizationConsts';

@Component({
    templateUrl: './robing.component.html',
    styleUrls: ['./robing.component.less'],
    encapsulation: ViewEncapsulation.None,
})
export class RobingComponent extends AppComponentBase {
    dashboardName = DashboardCustomizationConst.dashboardNames.defaultTenantDashboard;

    constructor(injector: Injector) {
        super(injector);
    }
}
