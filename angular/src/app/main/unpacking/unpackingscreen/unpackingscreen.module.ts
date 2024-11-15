import { NgModule } from '@angular/core';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { UnpackingScreenRoutingModule } from './unpackingscreen-routing.module';
import { UnpackingScreenComponent } from './unpackingscreen.component';
import { CustomizableDashboardModule } from '@app/shared/common/customizable-dashboard/customizable-dashboard.module';

@NgModule({
    declarations: [UnpackingScreenComponent],
    imports: [AppSharedModule, AdminSharedModule, UnpackingScreenRoutingModule, CustomizableDashboardModule],
})
export class UnpackingScreenModule {}
