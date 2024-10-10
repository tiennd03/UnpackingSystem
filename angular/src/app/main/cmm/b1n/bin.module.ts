import { NgModule } from '@angular/core';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { CustomizableDashboardModule } from '@app/shared/common/customizable-dashboard/customizable-dashboard.module';
import { CmmBinComponent } from './bin.component';
import { DashboardRoutingModule } from '@app/main/dashboard/dashboard-routing.module';
import { CmmBinRoutingModule } from './bin-routing.module';
import { CreateOrEditCmmBinModalComponent } from './create-or-edit-bin-modal.component';

@NgModule({
    declarations: [CmmBinComponent, CreateOrEditCmmBinModalComponent],
    imports: [AppSharedModule, CmmBinRoutingModule],
})
export class CmmBinModule {}
