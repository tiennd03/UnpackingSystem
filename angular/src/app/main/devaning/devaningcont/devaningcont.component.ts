import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@microsoft/signalr';
import { AppComponentBase } from '@shared/common/app-component-base';
import { LocalizePipe } from '@shared/common/pipes/localize.pipe';
import { DevaningModuleDto, DevaningModuleServiceProxy } from '@shared/service-proxies/service-proxies';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Paginator } from 'primeng/paginator';
import { Table } from 'primeng/table';
import { CreateOrEditDevaningContComponent } from './create-or-edit-devaningcont/create-or-edit-devaningcont.component';
import { result } from 'lodash-es';
import { error } from 'console';

@Component({
    templateUrl: './devaningcont.component.html',
    styleUrls: ['./devaningcont.component.less'],
    providers: [MessageService, ConfirmationService, DialogService],
})
export class DevaningContComponent extends AppComponentBase implements OnInit {
    @ViewChild('paginator', { static: true }) paginator: Paginator;
    @ViewChild('dt1') dt1: Table | undefined;
    @ViewChild('createOrEditDevaningContModal') createOrEditDevaningContModal: CreateOrEditDevaningContComponent;

    listDataDevaningCont;
    id;
    loading: boolean;
    loadingDowload: boolean;
    rowSelection: DevaningModuleDto[] = [];
    contextMenuSelection;
    columns;
    cols: any[];
    contextMenu;
    items: MenuItem[];
    ref: DynamicDialogRef;
    status: number;
    recordCountDevaned = 0;
    recordCountDevaning = 0;
    selected;

    constructor(
        injector: Injector,
        private devaningService: DevaningModuleServiceProxy,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        public dialogService: DialogService,
        private localizePipe: LocalizePipe
    ) {
        super(injector);
        this.cols = [
            { field: 'id', header: 'Id' },
            { field: 'devaningNo', header: 'Devaning No' },
            { field: 'containerNo', header: 'Container No' },
            { field: 'renban', header: 'Renban' },
            { field: 'suppilerNo', header: 'Supplier No' },
            { field: 'shiftNo', header: 'Shift No' },
            { field: 'workingDate', header: 'Working Date' },
            { field: 'planDevaningDate', header: 'Plan Devaning Date' },
            { field: 'actDevaningDate', header: 'Activity Devaning Date' },
            { field: 'actDevaningDateFinish', header: 'Activity Devaning Date Finish' },
            { field: 'devaningType', header: 'Activity Devaning Date' },
            { field: 'devaningStatus', header: 'Devaning Status' },
        ];
    }
    filter(value: string, field: string): void {
        if (this.dt1) {
            this.dt1.filter(value, field, 'contains');
        }
    }

    ngOnInit(): void {
        this.loadAllData();
        this.getAll(1);
    }

    loadAllData(status?: number) {
        this.devaningService.getAll(0).subscribe((res) => {
            this.listDataDevaningCont = res;
            this.recordCountDevaned = res.filter((x) => x.devaningStatus === 'DEVANED').length;
            this.recordCountDevaning = res.filter((x) => x.devaningStatus === 'DEVANING').length;
        });
    }

    getAll(status?: number) {
        this.loading = true;
        this.devaningService.getAll(status).subscribe(
            (res) => {
                this.status = status;
                this.listDataDevaningCont = res;
                this.loading = false;
            },
            (error) => {
                this.loading = false;
            }
        );
    }

    clear(table: Table) {
        table.clear();
    }

    onTabChange(event: any) {
        const index = event.index;
        this.getAll(index + 1);
    }

    showDialog(selection?: DevaningModuleDto) {
        this.ref = this.dialogService.open(CreateOrEditDevaningContComponent, {
            data: {
                selection: selection || new DevaningModuleDto(),
            },
            header: selection ? 'Chỉnh sửa Devaning' + "   " + selection.devaningNo : 'Thêm mới Devaning',
            width: '70%',
            height: 'auto'
        });

        this.ref.onClose.subscribe(result => {
            if (result) {
                this.getAll();
            }
        });
    }
}
