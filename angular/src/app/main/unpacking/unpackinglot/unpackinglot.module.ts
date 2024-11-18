import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { UnpackingLotRoutingModule } from './unpackinglot-routing.module';
import { UnpackingLotComponent } from './unpackinglot.component';
import { DialogService } from 'primeng/dynamicdialog';
import { LocalizePipe } from '@shared/common/pipes/localize.pipe';

@NgModule({
    declarations: [UnpackingLotComponent],
    imports: [AppSharedModule, UnpackingLotRoutingModule],
    exports: [UnpackingLotComponent],
    providers: [LocalizePipe, DialogService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UnpackingLotModule {}
