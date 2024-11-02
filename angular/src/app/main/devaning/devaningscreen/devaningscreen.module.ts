import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { LocalizePipe } from '@shared/common/pipes/localize.pipe';
import { DialogService } from 'primeng/dynamicdialog';
import { DevaningScreenComponent } from './devaningscreen.component';
import { DevaningScreenRoutingModule } from './devaningscreen-routing.module';

@NgModule({
    declarations: [
        DevaningScreenComponent
    ],
    imports: [
        AppSharedModule, DevaningScreenRoutingModule],
    exports: [
        DevaningScreenComponent
    ],
    providers: [LocalizePipe, DialogService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DevaningScreenModule { }
