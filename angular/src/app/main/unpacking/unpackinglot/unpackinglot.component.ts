﻿import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { UnpackingDto, UnpackingServiceProxy } from '@shared/service-proxies/service-proxies';
import { error } from 'console';
import { Paginator } from 'primeng/paginator';
import { Table } from 'primeng/table';

@Component({
    templateUrl: './unpackinglot.component.html',
    styleUrls: ['./unpackinglot.component.less'],
})
export class UnpackingLotComponent extends AppComponentBase implements OnInit {
    @ViewChild('paginator', { static: true }) paginator: Paginator;
    @ViewChild('dt1') dt1: Table | undefined;

    listUnpackingLot
    loading: boolean;
    rowSelection: UnpackingDto[] = [];
    columns;
    cols: any[];

    moduleNo
    devaningNo
    renban
    supplier
    moduleStatus

    constructor(
        injector: Injector,
        private _service: UnpackingServiceProxy
    ) {
        super(injector);
        this.cols = [
            { field: 'moduleNo', header: 'Module No' },
            { field: 'devaningNo', header: 'Devaning No' },
            { field: 'renban', header: 'Renban' },
            { field: 'supplier', header: 'Supplier' },
            { field: 'planUnpackingDate', header: 'Plan Unpacking Date' },
            { field: 'actUnpackingDate', header: 'Act Unpacking Date' },
            { field: 'actUnpackingDateFinish', header: 'Act Unpacking Date Finish' },
            { field: 'moduleStatus', header: 'Module Status' },
        ]
    }
    ngOnInit(): void {
        this.loading = true;
        this.getAll();
    }

    getAll() {
        this.loading = true;
        this._service.getAll(
            this.moduleNo,
            this.devaningNo,
            this.renban,
            this.supplier,
            this.moduleStatus
        ).subscribe((res) => {
            this.listUnpackingLot = res;
            this.loading = false
        },
        (error) => {
            this.loading = false;
        })
    }

    clearTextSearch (table: Table) {
        table.clear();
    }

    getStatusBackgroundClass(status: string): string {
        if (status === 'UPK') {
            return 'UPK';
        } else if (status === 'FINISH') {
            return 'FINISH';
        }
    }
}
