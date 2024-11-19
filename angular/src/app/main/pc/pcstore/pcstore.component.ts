import { Component, Injector, OnInit, ViewEncapsulation } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { PcStoreServiceProxy } from '@shared/service-proxies/service-proxies';

@Component({
    templateUrl: './pcstore.component.html',
    styleUrls: ['./pcstore.component.less'],
})
export class PcStoreComponent extends AppComponentBase implements OnInit {

    rowdata;
    partNo;
    partName;
    totalPart;
    totalLot;
    constructor(
        injector: Injector,
        private _service: PcStoreServiceProxy,
        // private _fileDownloadService: FileDownloadService,
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
        this.getDatas(this.partNo)
    }
    // exportToExcel(): void {
    //     this._service
    //         .getPcStoreToExcel(
    //             this.partNo,
    //             this.partName,
    //         )
    //         .subscribe((result) => {
    //             this._fileDownloadService.downloadTempFile(result);
    //             this.notify.success('Export success')

    //         },(error)=>{
    //             this.notify.error('Export failed',error)
    //         });
    // }

}
