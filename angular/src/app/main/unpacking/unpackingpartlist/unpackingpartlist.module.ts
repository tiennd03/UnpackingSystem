import { NgModule } from '@angular/core';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { UnpackingPartlistRoutingModule } from './unpackingpartlist-routing.module';
import { UnpackingPartlistComponent } from './unpackingpartlist.component';
import { CustomizableDashboardModule } from '@app/shared/common/customizable-dashboard/customizable-dashboard.module';

@NgModule({
    declarations: [UnpackingPartlistComponent],
    imports: [AppSharedModule, AdminSharedModule, UnpackingPartlistRoutingModule, CustomizableDashboardModule],
})
export class UnpackingPartlistModule {}
