import {
    Component,
    EventEmitter,
    HostListener,
    Injector,
    Input,
    OnInit,
    Optional,
    Output,
    ViewChild,
} from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DevaningModuleDto, DevaningModuleServiceProxy } from '@shared/service-proxies/service-proxies';
import { DateTime } from 'luxon';
import * as moment from 'moment';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { finalize } from 'rxjs';

@Component({
    selector: 'create-or-edit-devaningcont',
    templateUrl: './create-or-edit-devaningcont.component.html',
    styleUrls: ['./create-or-edit-devaningcont.component.less'],
})
export class CreateOrEditDevaningContComponent extends AppComponentBase {
    saving = false;
    selection: DevaningModuleDto = new DevaningModuleDto();
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
    @Output() modalClose: EventEmitter<any> = new EventEmitter<any>();

    constructor(
        injector: Injector,
        private _service: DevaningModuleServiceProxy,
        public dialogService: DialogService,
        @Optional() public ref: DynamicDialogRef
    ) {
        super(injector);
    }

    ngOnInit(): void {
        console.log('edit', this.selection);
        if (!this.selection) {
            this.selection = new DevaningModuleDto();
        }
    }

    save(): void {
        this.saving = true;
        const convertDate = (date: any): DateTime => {
            if (typeof date === 'string') {
                return DateTime.fromISO(date);
            } else if (date instanceof Date) {
                return DateTime.fromJSDate(date);
            }
            return date; // Trả về giá trị gốc nếu không phải là string hay Date
        };
    
        // Áp dụng hàm chuyển đổi cho các thuộc tính ngày tháng
        this.selection.actDevaningDate = convertDate(this.selection.actDevaningDate);
        this.selection.planDevaningDate = convertDate(this.selection.planDevaningDate);
        this.selection.workingDate = convertDate(this.selection.workingDate);

        this._service
            .updateOrCreate(this.selection)
            .pipe(finalize(() => (this.saving = false)))
            .subscribe(() => {
                this.notify.info(this.l('Saved Successfully'));
                this.ref.close(this.selection);
                this.modalSave.emit(this.selection);
            });
    }

    closeModal(): void {
        this.ref.close();
    }
}
