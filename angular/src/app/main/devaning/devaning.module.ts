import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { DialogService } from 'primeng/dynamicdialog';
import { LocalizePipe } from '@shared/common/pipes/localize.pipe';
import { DevaningRoutingModule } from './devaning-routing.module';


@NgModule({
  imports: [
    AppSharedModule, DevaningRoutingModule
  ],
  providers: [LocalizePipe, DialogService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DevaningModule { }
