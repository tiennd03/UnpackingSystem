import { Component, ViewChild, Injector, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '@shared/common/app-component-base';
import { finalize } from 'rxjs/operators';
import { CmmBinServiceProxy, CreateOrEditCmmBinDto } from '@shared/service-proxies/service-proxies';
import { BsDatepickerDirective } from 'ngx-bootstrap/datepicker';
import { DateTimeService } from '@app/shared/common/timing/date-time.service';


@Component({
    selector: 'create-or-edit-bin-modal',
    templateUrl: './create-or-edit-bin-modal.component.html',
})
export class CreateOrEditCmmBinModalComponent extends AppComponentBase {
    @ViewChild('createOrEditModalCmmBin', { static: true }) modal: ModalDirective | undefined;
    @ViewChild('nameInput') nameInput: ElementRef;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
    @Output() modalClose: EventEmitter<any> = new EventEmitter<any>();

    rowdata: CreateOrEditCmmBinDto = new CreateOrEditCmmBinDto();

    saving: boolean = false;
    _isActive: boolean;
    _requestTime;
    _requestDate;

    constructor(
        injector: Injector,
        private _service: CmmBinServiceProxy,
        private _dateTimeService: DateTimeService
    ) { super(injector); }

    show(rowdata?: CreateOrEditCmmBinDto): void {
        if (!rowdata) this.rowdata = new CreateOrEditCmmBinDto();
        else this.rowdata = rowdata;

        this.modal.show();
    }


    save(): void {
        this.saving = true;

        this._service.createOrEdit(this.rowdata)
            .pipe(finalize(() => this.saving = false))
            .subscribe(() => {
                this.notify.info(this.l('SavedSuccessfully'));
                this.close();
                this.modal?.hide();
                this.modalSave.emit(this.rowdata);
            });
        this.saving = false;
    }

    close(): void {
        this.modal?.hide();
        this.modalClose.emit(null);
    }

    @HostListener('document:keydown', ['$event'])
    onKeydownHandler(event: KeyboardEvent) {
        if (event.key === "Escape") {
            this.close();
        }
    }
}
