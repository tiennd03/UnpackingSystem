import { Component, Injector, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { PartInModuleDto, UnpackingDto, UnpackingServiceProxy } from '@shared/service-proxies/service-proxies';
import { result } from 'lodash-es';
import { Table } from 'primeng/table';

@Component({
    templateUrl: './unpackingscreen.component.html',
    styleUrls: ['./unpackingscreen.component.less'],
})
export class UnpackingScreenComponent extends AppComponentBase implements OnInit{
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

    constructor(
        injector: Injector,
        private _service: UnpackingServiceProxy,
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

    getModulePlan() {
        this._service.getModulePlan().subscribe((res) => {
            const upkModule = res.find(item => item.moduleStatus === 'UPK');
            this.moduleNoCurrent = upkModule ? upkModule.moduleNo : null;
            this.moduleActual = res.length;
            this.moduleFinish = res.filter(item => item.moduleStatus === 'FINISH').length;

            this.moduleNoStatus = upkModule ? 'UPK' : null
            if(this.moduleNoCurrent) {
                this.getPartInModule();
            }
        })
    }

    getPartInModule() {
        this._service.getPartInModule(this.moduleNoCurrent).subscribe((res) =>{
            this.listPartInModule = res;
            this.partStatus = res.filter(item => item.status !== 'READY').length;
            this.partCurrent = res.filter(item => item.status).length;
        })
    }

    finishUpkModule(id: string) {
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
}
