import { Component, EventEmitter, Injector, Input, OnInit, Optional, Output } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { UnpackingServiceProxy } from '@shared/service-proxies/service-proxies';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UnpackingScreenComponent } from '../unpackingscreen.component';

@Component({
    selector: 'app-create-robing',
    templateUrl: './create-robing.component.html',
    styleUrls: ['./create-robing.component.less']
})
export class CreateRobingComponent extends AppComponentBase implements OnInit {

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
    @Output() modalClose: EventEmitter<any> = new EventEmitter<any>();


    saving = false;
    active: boolean = false;

    partDetail;
    partName: string;
    supplier: string;
    type: string;
    description: string;

    disabled: boolean = true;

    constructor(
        injector: Injector,
        public dialogService: DialogService,
        public config: DynamicDialogConfig,
        @Optional() public ref: DynamicDialogRef,
        private _service: UnpackingServiceProxy,
    ) {
        super(injector)
    }

    ngOnInit() {
        this.partDetail = this.config.data.partDetail;
        if (this.partDetail) {
            this.partName = this.partDetail.partName;
            this.supplier = this.partDetail.supplier;
        }
    }

    commit(): void {
        this._service.addPartToRobbing(
            this.partDetail.id,
            this.partDetail.partNo,
            this.partDetail.partName,
            this.partDetail.supplier,
            this.partDetail.moduleNo,
            this.type,
            this.description
            )
        .subscribe(()=>{
            this.notify.success('Add Robbing success')
            this.modalSave.emit();
            this.closeModal()
        },(error)=>{
            this.notify.error('Add Robbing Error',error)
        })
    }

    closeModal(): void {
        this.ref.close();
    }

    setTypeRobing(type){
        var typeRobing = document.querySelectorAll('.rb-type')
        var selectionElement = document.querySelector('.' + type)
        typeRobing.forEach(function(element) {
            element.classList.remove('active')
        });
        selectionElement.classList.add('active')
        this.type = type
        this.disabled = false;
    }

}
