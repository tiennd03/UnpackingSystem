import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { UnpackingPartlistRoutingModule } from './unpackingpartlist-routing.module';
import { UnpackingPartlistComponent } from './unpackingpartlist.component';
import { DialogService } from 'primeng/dynamicdialog';
import { LocalizePipe } from '@shared/common/pipes/localize.pipe';
@NgModule({
    declarations: [UnpackingPartlistComponent],
    imports: [AppSharedModule, UnpackingPartlistRoutingModule],
    exports: [UnpackingPartlistComponent],
    providers: [LocalizePipe, DialogService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UnpackingPartlistModule {}
