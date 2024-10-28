import { NgModule } from '@angular/core';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { FilebentrongRoutingModule } from './filebentrong-routing.module';
import { FilebentrongComponent } from './filebentrong.component';
import { CustomizableDashboardModule } from '@app/shared/common/customizable-dashboard/customizable-dashboard.module';

@NgModule({
    declarations: [FilebentrongComponent],
    imports: [AppSharedModule, AdminSharedModule, FilebentrongRoutingModule, CustomizableDashboardModule],
})
export class FilebentrongModule {}
