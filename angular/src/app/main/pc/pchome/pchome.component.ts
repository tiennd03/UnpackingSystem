import { Component, Injector, OnInit, ViewEncapsulation } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DashboardCustomizationConst } from '@app/shared/common/customizable-dashboard/DashboardCustomizationConsts';
import { PcHomeServiceProxy } from '@shared/service-proxies/service-proxies';
import { ExportExcelService } from '@app/main/export-excel-standard.service';

@Component({
    templateUrl: './pchome.component.html',
    styleUrls: ['./pchome.component.less'],
})
export class PcHomeComponent extends AppComponentBase implements OnInit {

    rowdata;
    partNo;
    partName;
    totalPart;
    totalLot;

    loadingDowload: boolean = false;
    constructor(
        injector: Injector,
        private _service: PcHomeServiceProxy,
        private excelService: ExportExcelService,
    ) {
        super(injector)
    }

    ngOnInit() {
        this.getDatas();
    }

    getDatas(partNo?) {
        this._service.getAll(
            partNo,
            this.partName
        )
            .subscribe((result) => {
                this.rowdata = result;
                this.totalPart = this.rowdata.length;
                this.totalLot = this.totalPart / 10;

            });

    }
    searchOrClear(type?) {
        this.partNo = (type === "Clear") ? '' : this.partNo;
        this.getDatas(this.partNo);
    }

    exportToExcel(): void {
        if (!this.rowdata.length) {
            this.notify.warn('No Data to Export');
        }
        else {
            this.loadingDowload = true;
            this.excelService.exportExcel(this.rowdata, 'PcHome').then(() => {
                this.loadingDowload = false;
            }).catch(() => {
                this.loadingDowload = false;
            });
        }
    }

}
