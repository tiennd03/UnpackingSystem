import { NgModule } from '@angular/core';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { TesstmanhinhRoutingModule } from './tesstmanhinh-routing.module';
import { CustomizableDashboardModule } from '@app/shared/common/customizable-dashboard/customizable-dashboard.module';

@NgModule({
    // declarations: [TesstmanhinhRoutingModule],
    imports: [AppSharedModule, AdminSharedModule,
        CustomizableDashboardModule, TesstmanhinhRoutingModule],
})
export class TesstmanhinhModule {}
