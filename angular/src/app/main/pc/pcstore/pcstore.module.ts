import { NgModule } from '@angular/core';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { PcStoreRoutingModule } from './pcstore-routing.module';
import { PcStoreComponent } from './pcstore.component';
import { CustomizableDashboardModule } from '@app/shared/common/customizable-dashboard/customizable-dashboard.module';

@NgModule({
    declarations: [PcStoreComponent],
    imports: [AppSharedModule, AdminSharedModule, PcStoreRoutingModule, CustomizableDashboardModule],
})
export class PcStoreModule {}
