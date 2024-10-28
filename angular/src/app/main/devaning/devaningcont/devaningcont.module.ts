import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { DevaningContComponent } from './devaningcont.component';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { DevaningContRoutingModule } from './devaningcont-routing.module';
import { LocalizePipe } from '@shared/common/pipes/localize.pipe';
import { DialogService } from 'primeng/dynamicdialog';

@NgModule({
    declarations: [
        DevaningContComponent
    ],
    imports: [
        AppSharedModule, DevaningContRoutingModule],
    exports: [
        DevaningContComponent
    ],
    providers: [LocalizePipe, DialogService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DevaningContModule { }
