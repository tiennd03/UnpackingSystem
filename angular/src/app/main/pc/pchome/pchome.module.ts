﻿import { NgModule } from '@angular/core';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { PcHomeRoutingModule } from './pchome-routing.module';
import { PcHomeComponent } from './pchome.component';
import { CustomizableDashboardModule } from '@app/shared/common/customizable-dashboard/customizable-dashboard.module';

@NgModule({
    declarations: [PcHomeComponent],
    imports: [AppSharedModule, AdminSharedModule, PcHomeRoutingModule, CustomizableDashboardModule],
})
export class PcHomeModule {}
