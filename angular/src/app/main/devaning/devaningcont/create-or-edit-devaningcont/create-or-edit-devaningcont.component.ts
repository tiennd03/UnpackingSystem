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
import { shakeAnimation } from '@app/animation';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DevaningModuleDto, DevaningModuleServiceProxy } from '@shared/service-proxies/service-proxies';
import { DateTime } from 'luxon';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { finalize } from 'rxjs';

@Component({
    selector: 'create-or-edit-devaningcont',
    templateUrl: './create-or-edit-devaningcont.component.html',
    styleUrls: ['./create-or-edit-devaningcont.component.less'],
    animations: [shakeAnimation],
    providers: [MessageService],
})
export class CreateOrEditDevaningContComponent extends AppComponentBase {

    suppliers: { label: string; value: string }[] = [];
    devaningStatuses: { label: string; value: string }[] = [];
    saving = false;
    selection: DevaningModuleDto = new DevaningModuleDto();
    validationErrors: { [key: string]: string } = {};
    shakeState: string = '';
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
    @Output() modalClose: EventEmitter<any> = new EventEmitter<any>();

    constructor(
        injector: Injector,
        private _service: DevaningModuleServiceProxy,
        public dialogService: DialogService,
        public config: DynamicDialogConfig,
        @Optional() public ref: DynamicDialogRef,
        private messageService: MessageService,
    ) {
        super(injector);

        this.suppliers = [
            { label: 'TMT', value: 'TMT' },
            { label: 'TMI', value: 'TMI' },
        ];

        this.devaningStatuses = [
            { label: 'READY', value: 'READY' },
            { label: 'DEVANED', value: 'DEVANED' },
        ];
    }

    ngOnInit(): void {
        console.log('edit', this.selection);
        if (this.config.data && this.config.data.selection) {
            this.selection = { ...this.config.data.selection };
            if (this.config.data.selection.planDevaningDate instanceof DateTime) {
                this.selection.planDevaningDate = this.config.data.selection.planDevaningDate.toJSDate();
            }
            if (this.config.data.selection.actDevaningDate instanceof DateTime) {
                this.selection.actDevaningDate = this.config.data.selection.actDevaningDate.toJSDate();
            }
            if (this.config.data.selection.workingDate instanceof DateTime) {
                this.selection.workingDate = this.config.data.selection.workingDate.toJSDate();
            }
        } else {
            this.selection = new DevaningModuleDto();
        }
    }

    save(): void {

        if (this.validate()) {
            if (this.selection.renban === 'D' || this.selection.renban === 'X') {
                this.messageService.add({severity: 'warn', summary:'Validation Error', detail:'Please enter Renban Information'});
                return;
            }

            this.saving = true;
            const convertDate = (date: any): DateTime => {
                if (typeof date === 'string') {
                    return DateTime.fromISO(date);
                } else if (date instanceof Date) {
                    return DateTime.fromJSDate(date);
                }
                return date;
            };

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
        } else {
            this.messageService.add({severity: 'error', summary: 'Validation Error', detail: 'Please fill in all required fields'});
        }
    }

    closeModal(): void {
        this.ref.close();
    }

    onSupplierChange(supplier: string): void {
        if (supplier === 'TMI') {
            this.selection.renban = 'X';
        } else if (supplier === 'TMT') {
            this.selection.renban = 'D';
        } else {
            this.selection.renban = '';
        }
    }

    onRenbanChange(renban: string): void {
        if (renban === '') {
            this.selection.suppilerNo = '';
        }
    }

    validateField(field: string): void {
        switch (field) {
            case 'devaningNo':
                this.validationErrors.devaningNo = this.selection.devaningNo ? '' : 'This field is required';
                break;
            case 'containerNo':
                this.validationErrors.containerNo = this.selection.containerNo ? '' : 'This field is required';
                break;
            case 'shiftNo':
                this.validationErrors.shiftNo = this.selection.shiftNo ? '' : 'This field is required';
                break;
            case 'planDevaningDate':
                this.validationErrors.planDevaningDate = this.selection.planDevaningDate ? '' : 'Error';
                if (!this.selection.planDevaningDate) {
                    this.shakeState = 'shake' ; setTimeout(() => this.shakeState = '', 1000);
                }
                break;
            case 'renban':
                this.validationErrors.renban = this.selection.renban ? '' : 'This field is required';
                break;
            case 'supplierNo':
                this.validationErrors.supplierNo = this.selection.suppilerNo ? '' : 'Error';
                if (!this.selection.suppilerNo) {
                    this.shakeState = 'shake' ; setTimeout(() => this.shakeState = '', 1000);
                }
                break;
            case 'devaningType':
                this.validationErrors.devaningType = this.selection.devaningType ? '' : 'This field is required';
                break;
            case 'devaningStatus':
                this.validationErrors.devaningStatus = this.selection.devaningStatus ? '' : 'Error';
                if (!this.selection.devaningStatus) {
                    this.shakeState = 'shake' ; setTimeout(() => this.shakeState = '', 1000);
                }
                break;
            default:
                break;
        }
    }

    validate(): boolean {
        this.validateField ('devaningNo');
        this.validateField ('containerNo');
        this.validateField ('shiftNo');
        this.validateField ('planDevaningDate');
        this.validateField ('renban');
        this.validateField ('supplierNo');
        this.validateField ('devaningType');
        this.validateField ('devaningStatus');

        return !Object.values(this.validationErrors).some(error => error !== '');
    }
}
