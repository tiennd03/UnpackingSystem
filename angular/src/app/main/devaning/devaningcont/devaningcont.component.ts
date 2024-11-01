import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@microsoft/signalr';
import { AppComponentBase } from '@shared/common/app-component-base';
import { LocalizePipe } from '@shared/common/pipes/localize.pipe';
import { DevaningModuleDto, DevaningModuleServiceProxy } from '@shared/service-proxies/service-proxies';
import { ConfirmationService, ConfirmEventType, MenuItem, MessageService } from 'primeng/api';
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
        this.items = [
            {
                label: 'Edit', icon: 'pi pi-fw pi-search',
                command: () => this.showDialog(this.contextMenuSelection)
            },
            {
                label: 'Delete', icon: 'pi pi-fw pi-times',
                command: () => this.deleteRecord(this.contextMenuSelection, 'MULTI_DELETE')
            }
        ];
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
            header: selection ? 'Edit Devaning' + "   " + selection.devaningNo : 'Create Devaning',
            width: '60%',
            height: 'auto'
        });

        this.ref.onClose.subscribe(result => {
            if (result) {
                this.getAll(this.status);
            }
        });
    }

    editRecord() {
        if (this.rowSelection.length === 1) {
            this.showDialog(this.rowSelection[0]);
        } else {
            this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Please select one record to edit.' });
        }
    }

    deleteRecord(id, typeDelete: string) {
        this.confirmationService.confirm({
            key: 'deleteDialog',
            message:'Do you want to delete this record',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            accept: () => {
                let ids: number[] = [];
                if (typeDelete === 'ONE_DELETE') {
                    ids = id;
                } else if (typeDelete === 'MULTI_DELETE') {
                    ids = this.rowSelection.map(record => record.id);
                }
                this.devaningService.delete(ids).subscribe(() => {
                    this.getAll(this.status)
                    this.messageService.add({ severity: 'success', summary: 'Delete', detail: this.localizePipe.transform('Youhavedeleted') });
                }, error => {
                    this.messageService.add({ severity: 'danger', summary: 'Delete', detail: error });
                })
            },
            reject: (type) => {
                switch (type) {
                    case ConfirmEventType.REJECT:
                        break;
                    case ConfirmEventType.CANCEL:
                        break;
                }
            }
        });
    }
}
