import { NgModule } from '@angular/core';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { RobingRoutingModule } from './robing-routing.module';
import { RobingComponent } from './robing.component';
import { CustomizableDashboardModule } from '@app/shared/common/customizable-dashboard/customizable-dashboard.module';

@NgModule({
    declarations: [RobingComponent],
    imports: [AppSharedModule, AdminSharedModule, RobingRoutingModule, CustomizableDashboardModule],
})
export class RobingModule {}
