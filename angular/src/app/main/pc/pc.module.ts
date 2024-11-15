import { NgModule } from '@angular/core';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { PcRoutingModule} from './pc-routing.module';
import { CustomizableDashboardModule } from '@app/shared/common/customizable-dashboard/customizable-dashboard.module';

@NgModule({
    imports: [AppSharedModule, AdminSharedModule,
        CustomizableDashboardModule, PcRoutingModule],
})
export class PcModule {}
