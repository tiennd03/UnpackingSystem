import { Component, EventEmitter, HostListener, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from "@shared/common/app-component-base";
import { DevaningModuleDto, DevaningModuleServiceProxy } from '@shared/service-proxies/service-proxies';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';

@Component({
    selector: 'create-or-edit-devaningcont',
    templateUrl: './create-or-edit-devaningcont.component.html',
    styleUrls: ['./create-or-edit-devaningcont.component.less'],
})
export class CreateOrEditDevaningContComponent extends AppComponentBase {
    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
    @Output() modalClose: EventEmitter<any> = new EventEmitter<any>();
    @Input() listDataDevaningCont: any[] = [];
    active: boolean = false;
    saving: boolean = false;
    createOrEditDevaningCont: DevaningModuleDto = new DevaningModuleDto();

    constructor(
        injector: Injector,
        private _service: DevaningModuleServiceProxy,
    ) {
        super(injector);
    }

    show(selected?: number) {
        if (!selected) {
            this.createOrEditDevaningCont = new DevaningModuleDto();
            this.active = true;
            this.listDataDevaningCont = this.listDataDevaningCont.filter(x => x.value != '');
            this.modal.show();
        }
        else {
            this._service.getDevaningModuleForEdit(selected).subscribe((result) => {
                this.createOrEditDevaningCont = result.devaningModuleDtoValue;
                this.active = true;
                this.listDataDevaningCont = this.listDataDevaningCont.filter(x => x.value != '');
                this.modal.show();
            })
        }
    }

    save(): void {
        this.saving = true;
        this._service.createOrEdit(this.createOrEditDevaningCont)
            .pipe(finalize(() => this.saving = false))
            .subscribe(() => {
                this.notify.info(this.l('SavedSuccessfully'));
                this.close();
                this.modalSave.emit(null);
                this.createOrEditDevaningCont = new DevaningModuleDto();
                this.saving = false;
            });

    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }

    @HostListener('document:keydown', ['$event'])
    onKeydownHandler(event: KeyboardEvent) {
        if (event.key === "Escape") {
            this.close();
        }
    }
}
