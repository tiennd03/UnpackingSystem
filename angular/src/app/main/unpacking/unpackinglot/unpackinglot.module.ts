import { NgModule } from '@angular/core';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { UnpackingLotRoutingModule } from './unpackinglot-routing.module';
import { UnpackingLotComponent } from './unpackinglot.component';
import { CustomizableDashboardModule } from '@app/shared/common/customizable-dashboard/customizable-dashboard.module';

@NgModule({
    declarations: [UnpackingLotComponent],
    imports: [AppSharedModule, AdminSharedModule, UnpackingLotRoutingModule, CustomizableDashboardModule],
})
export class UnpackingLotModule {}
