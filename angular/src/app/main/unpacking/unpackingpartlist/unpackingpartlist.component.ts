import { Component, Injector, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
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
        private _service: UnpackingServiceProxy

    ) {
        super(injector);
        this.cols = [
            { field: 'partNo', header: 'Part No' },
            { field: 'moduleNo', header: 'Module No' },
            { field: 'partName', header: 'Part Name' },
            { field: 'renban', header: 'Renban' },
            { field: 'supplier', header: 'Supplier' },
            { field: 'status', header: 'Status' },
        ];

        this.searchFields = [
            { label: 'All', value: '' },
            { label: 'Part No', value: 'partNo' },
            { label: 'Module No', value: 'moduleNo' },
            { label: 'Part Name', value: 'partName' },
            { label: 'Renban', value: 'renban' },
            { label: 'Supplier', value: 'supplier' },
            { label: 'Status', value: 'status' }
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
        if (this.selectedField === '') {
            this.dt1.clear();
        } else {
            this.dt1.filter(value, this.selectedField, 'contains');
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

}
