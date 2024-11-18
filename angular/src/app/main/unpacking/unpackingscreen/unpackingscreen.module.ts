import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { UnpackingScreenRoutingModule } from './unpackingscreen-routing.module';
import { UnpackingScreenComponent } from './unpackingscreen.component';
import { CreateRobingComponent } from './create-robing/create-robing.component';
import { DialogService } from 'primeng/dynamicdialog';
import { LocalizePipe } from '@shared/common/pipes/localize.pipe';

@NgModule({
    declarations: [UnpackingScreenComponent, CreateRobingComponent],
    imports: [AppSharedModule, UnpackingScreenRoutingModule],
    exports: [UnpackingScreenComponent, CreateRobingComponent],
    providers: [LocalizePipe, DialogService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UnpackingScreenModule {}
