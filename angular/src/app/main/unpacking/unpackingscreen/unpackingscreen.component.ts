import { Component, Injector, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { PartInModuleDto, UnpackingDto, UnpackingServiceProxy } from '@shared/service-proxies/service-proxies';
import { result } from 'lodash-es';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { CreateRobingComponent } from './create-robing/create-robing.component';
import { MessageService } from 'primeng/api';

@Component({
    templateUrl: './unpackingscreen.component.html',
    styleUrls: ['./unpackingscreen.component.less'],
    providers:[MessageService],
})
export class UnpackingScreenComponent extends AppComponentBase implements OnInit {
    @ViewChild('dt1') dt1: Table | undefined;

    listPartInModule;
    rowSelection: PartInModuleDto
    cols: any[];

    partStatus;
    partCurrent;

    moduleActual;
    moduleFinish;
    moduleNoCurrent;
    moduleNoStatus;

    partNo;
    partName;
    renban;
    supplier;
    status;

    ref: DynamicDialogRef;

    constructor(
        injector: Injector,
        private _service: UnpackingServiceProxy,
        public dialogService: DialogService,
        private messageService: MessageService,
    ) {
        super(injector);
        this.cols = [
            { field: 'partNo', header: 'Part No' },
            { field: 'partName', header: 'Part Name' },
            { field: 'renban', header: 'Renban' },
            { field: 'supplier', header: 'Supplier' },
            { field: 'status', header: 'Status' }
        ];
    }

    filter(value: string, field: string): void {
        if (this.dt1) {
            this.dt1.filter(value, field, 'contains');
        }
    }
    ngOnInit(): void {
        this.getModulePlan();
    }

    // ngAfterViewInit() {
    //     setInterval(() => {
    //       this.getPartInModule();
    //     }, 1000);
    //   }

    //   ngOnDestroy():void{
    //     }

    getModulePlan() {
        this._service.getModulePlan().subscribe((res) => {
            const upkModule = res.find(item => item.moduleStatus === 'UPK');
            this.moduleNoCurrent = upkModule ? upkModule.moduleNo : null;
            this.moduleActual = res.length;
            this.moduleFinish = res.filter(item => item.moduleStatus === 'FINISH').length;

            this.moduleNoStatus = upkModule ? 'UPK' : null
            if (this.moduleNoCurrent) {
                this.getPartInModule();
            }
        })
    }

    getPartInModule() {
        this._service.getPartInModule(this.moduleNoCurrent).subscribe((res) => {
            this.listPartInModule = res;
            this.partStatus = res.filter(item => item.status !== 'READY').length;
            this.partCurrent = res.filter(item => item.status).length;
        })
    }

    finishUpkModule(id: string) {
        if (!this.isGranted('Pages.UPS.Unpacking.FinishUpkModule')) {
            this.messageService.add({severity:'warn', summary:'Permission invalid', detail:'Your permission can not do this action'});
            return;
        }

        this.message.confirm(this.l(''), 'FINISH UNPACKING MODULE', (isConfirmed) => {
            if (isConfirmed) {
                this._service.finishUpkModule(id)
                    .subscribe(() => {
                        this.notify.success(this.l('FINISH Successfully '));
                        this.getModulePlan();
                    });
            }
        });
    }

    getStatusBackgroundClass(status: string): string {
        if (status === 'START') {
            return 'START';
        } else if (status === 'FINISH') {
            return 'FINISH';
        }
        else if (status === 'ROBING') {
            return 'ROBING';
        }
    }

    checkStatusModule(moduleStatus: string): string {
        if (moduleStatus === 'UPK') {
            return 'UPK';
        } else if (moduleStatus === 'DELAY') {
            return 'DELAY';
        }
    }

    finishPart(record) {
        this.message.confirm(this.l('Are You Sure To Finish Part'), 'FINISH PART', (isConfirmed) => {
            if (isConfirmed) {
                this._service.finishPart(record.id).subscribe(_ => {
                    this.notify.success(this.l('Finish success'));
                    this.getModulePlan();
                    this.checkFinishModule();
                    console.log('finish part', record.id);
                }, (error) => {
                    this.notify.error('Finish Error', error)
                })
            }
        });
    }
    checkFinishModule() {
        if (this.partStatus + 1 == this.partCurrent) {
            this._service.finishUpkModule(this.moduleNoCurrent)
                .subscribe(() => {
                    this.notify.success(this.l('FINISH Successfully '));
                    this.getModulePlan();
                });
        }
    }

    addrobing(data) {
        this.ref = this.dialogService.open(CreateRobingComponent, {
            data: { partDetail: data },
            header:'Create Robing',
            width: '60%',
            height: 'auto'
        });

        this.ref.onClose.subscribe(() => {
            this.getModulePlan();
            this.checkFinishModule();
        });
    }
}
