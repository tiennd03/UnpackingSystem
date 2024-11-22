import {
    Component,
    EventEmitter,
    Injector,
    Optional,
    Output,
} from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
    selector: 'time-setup',
    templateUrl: './time-setup.component.html',
})
export class TimeSetupComponent extends AppComponentBase {

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
    @Output() modalClose: EventEmitter<any> = new EventEmitter<any>();

    constructor(
        injector: Injector,
        public dialogService: DialogService,
        public config: DynamicDialogConfig,
        @Optional() public ref: DynamicDialogRef
    ) {
        super(injector);

    }

    save(): void {
    }

    closeModal(): void {
        this.ref.close();
    }
}
