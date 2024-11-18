import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '@app/app-routing.module';
import { AppBsModalModule } from '@shared/common/appBsModal/app-bs-modal.module';
import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';
import { UtilsModule } from '@shared/utils/utils.module';
import { TextMaskModule } from 'angular2-text-mask';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ImageCropperModule } from 'ngx-image-cropper';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { PaginatorModule } from 'primeng/paginator';
import { ProgressBarModule } from 'primeng/progressbar';
import { TableModule } from 'primeng/table';
import { AppCommonModule } from './common/app-common.module';
import { ThemesLayoutBaseComponent } from './layout/themes/themes-layout-base.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ContextMenuModule } from 'primeng/contextmenu';
import {ToastModule} from 'primeng/toast';
import { TabViewModule } from 'primeng/tabview';
import { TagModule } from 'primeng/tag';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { MessagesModule } from 'primeng/messages';
import {BadgeModule} from 'primeng/badge';
import {CardModule} from 'primeng/card';
import { CalendarModule } from 'primeng/calendar';
import {RadioButtonModule} from 'primeng/radiobutton';
import {FileUploadModule} from 'primeng/fileupload';
import {SkeletonModule} from 'primeng/skeleton';
import {ToolbarModule} from 'primeng/toolbar';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';


const imports = [
    CommonModule,
    FormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    ModalModule,
    TabsModule,
    BsDropdownModule,
    PopoverModule,
    BsDatepickerModule,
    AppCommonModule,
    FileUploadModule,
    AppRoutingModule,
    UtilsModule,
    ServiceProxyModule,
    TableModule,
    PaginatorModule,
    ProgressBarModule,
    PerfectScrollbarModule,
    TextMaskModule,
    ImageCropperModule,
    AutoCompleteModule,
    NgxSpinnerModule,
    AppBsModalModule,
    InputTextModule,
    ButtonModule,
    ContextMenuModule,
    TabViewModule,
    DynamicDialogModule,
    CalendarModule,
    ButtonModule,
    ToastModule,
    RadioButtonModule,
    TagModule,
    ConfirmPopupModule,
    ConfirmDialogModule,
    MessagesModule,
    BadgeModule,
    CardModule,
    ProgressSpinnerModule,
    SkeletonModule,
    DropdownModule,
    ToolbarModule,
    DialogModule

];

@NgModule({
    imports: [...imports],
    exports: [...imports],
    declarations: [ThemesLayoutBaseComponent],
    schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class AppSharedModule {}
