import { Component, Injector, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ExportExcelService } from '@app/main/export-excel-standard.service';
import { AppComponentBase } from '@shared/common/app-component-base';
import { PartListDto, UnpackingServiceProxy } from '@shared/service-proxies/service-proxies';
import { Paginator } from 'primeng/paginator';
import { Table } from 'primeng/table';

@Component({
    templateUrl: './unpackingpartlist.component.html',
    styleUrls: ['./unpackingpartlist.component.less'],
})
export class UnpackingPartlistComponent extends AppComponentBase implements OnInit {
    @ViewChild('paginator', { static: true }) paginator: Paginator;
    @ViewChild('dt1') dt1: Table | undefined;

    listUnpackingpartlist;
    loading: boolean;
    loadingDowload: boolean;
    rowSelection: PartListDto[] = [];
    columns;
    cols: any[];

    partNo;
    moduleNo;
    status

    searchFields;
    selectedField: string;
    searchValue: string = '';

    constructor(
        injector: Injector,
        private _service: UnpackingServiceProxy,
        private excelService: ExportExcelService,

    ) {
        super(injector);
        this.cols = [
            { field: 'id', header: 'ID' },
            { field: 'partNo', header: 'Part No' },
            { field: 'moduleNo', header: 'Module No' },
            { field: 'partName', header: 'Part Name' },
            { field: 'renban', header: 'Renban' },
            { field: 'supplier', header: 'Supplier' },
            { field: 'status', header: 'Status' },
        ];

    }

    ngOnInit(): void {
        this.loading = true;
        this.getAllPartList();
    }

    getAllPartList() {
        this.loading = true;
        this._service.getAllPartList(
            this.partNo,
            this.moduleNo,
            this.status
        ).subscribe((res) => {
            this.listUnpackingpartlist = res;
            this.loading = false;
        },
            (error) => {
                this.loading = false;
            });

    }

    onSearch(value: string): void {
        if (!value) {
            this.dt1.clear();
        } else {
            this.dt1.filter(value, 'moduleNo', 'contains');
        }
    }

    getStatusBackgroundClass(status: string): string {
        if (status === 'ROBING') {
            return 'ROBING';
        } else if (status === 'FINISH') {
            return 'FINISH';
        } else if (status === 'READY') {
            return 'READY'
        }
    }

    exportToExcel(): void {
        if (!this.listUnpackingpartlist.length) {
            this.notify.warn('No Data to Export');
        }
        this.loadingDowload = true;
        this.excelService.exportExcel(this.listUnpackingpartlist, 'UnpackingPartList').then(() => {
            this.loadingDowload = false;
        }).catch(() => {
            this.loadingDowload = false;
        });
    }

}
