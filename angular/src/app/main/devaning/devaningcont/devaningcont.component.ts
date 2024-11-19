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
    recordCountReady = 0;
    recordCountDevaned = 0;
    recordCountDevaning = 0;
    currentTab: string = 'New';
    selected;

    searchFields;
    selectedField: string;
    searchValue: string = '';

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
            // { field: 'workingDate', header: 'Working Date' },
            { field: 'planDevaningDate', header: 'Plan Devaning Date' },
            // { field: 'actDevaningDate', header: 'Activity Devaning Date' },
            // { field: 'actDevaningDateFinish', header: 'Activity Devaning Date Finish' },
            { field: 'devaningType', header: 'Devaning Type' },
            { field: 'devaningStatus', header: 'Devaning Status' },
        ];

        this.searchFields = [
            { label: 'All', value: '' },
            { label: 'Devaning No', value: 'devaningNo' },
            { label: 'Container No', value: 'containerNo' },
            { label: 'Renban', value: 'renban' },
            { label: 'Supplier No', value: 'suppilerNo' },
            { label: 'Shift No', value: 'shiftNo' },
            { label: 'Devaning Status', value: 'devaningStatus' }
        ];
    }
    filter(value: string, field: string): void {
        if (this.dt1) {
            this.dt1.filter(value, field, 'contains');
        }
    }

    ngOnInit(): void {
        this.loading = true;
        this.updateContextMenuItems();
        this.loadAllData();
        this.getAll(1);
    }

    loadAllData() {
        this.devaningService.getAll(0).subscribe((res) => {
            this.listDataDevaningCont = res;
            this.recordCountReady = res.filter((x) => x.devaningStatus === 'READY').length
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

    onSearch(value: string): void {
        if (this.selectedField === '') {
            this.dt1.clear();
        } else {
            this.dt1.filter(value, this.selectedField, 'contains');
        }
    }

    clear(table: Table) {
        table.clear();
    }

    onTabChange(event: any) {
        const index = event.index;
        this.rowSelection = [];
        switch (index) {
            case 0:
                this.currentTab = 'New';
                break;
            case 1:
                this.currentTab = 'Devaned';
                break;
            case 2:
                this.currentTab = 'Devaning';
                break;
            default:
                this.currentTab = 'New';
                break;
        }
        this.getAll(index + 1);
        this.updateContextMenuItems();
    }

    updateContextMenuItems() {
        this.items = [];

        // Tab "New" có thể mở được cả "Edit" và "Delete"
        if (this.currentTab === 'New') {
            this.items.push(
                {
                    label: 'Edit', icon: 'pi pi-fw pi-search',
                    command: () => this.showDialog(this.contextMenuSelection)
                },
                {
                    label: 'Delete', icon: 'pi pi-fw pi-times',
                    command: () => this.deleteRecord(this.contextMenuSelection, 'MULTI_DELETE')
                }
            );
        }

        // Tab "Devaned" có thể mở được cả "Edit" và "Delete"
        else if (this.currentTab === 'Devaned') {
            this.items.push(
                {
                    label: 'Edit', icon: 'pi pi-fw pi-search',
                    command: () => this.showDialog(this.contextMenuSelection)
                },
                {
                    label: 'Delete', icon: 'pi pi-fw pi-times',
                    command: () => this.deleteRecord(this.contextMenuSelection, 'MULTI_DELETE')
                }
            );
        }

        // Tab "Devaning" chỉ có thể mở được "Edit"
        else if (this.currentTab === 'Devaning') {
            this.items.push(
                {
                    label: 'Edit', icon: 'pi pi-fw pi-search',
                    command: () => this.showDialog(this.contextMenuSelection)
                }
            );
        }
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
                // this.getAll(this.status);
                // this.ngOnInit();
                this.onRecordSaved();
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

    onRecordSaved(): void {
        this.loadAllData();
        this.getAll(this.status);
    }

    deleteRecord(id, typeDelete: string) {
        // Kiểm tra xem có bản ghi nào được chọn hay không
        if (typeDelete === 'ONE_DELETE' && !id) {
            this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Please select a record to delete.' });
            return;
        } else if (typeDelete === 'MULTI_DELETE' && this.rowSelection.length === 0) {
            this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Please select at least one record to delete.' });
            return;
        }

        this.confirmationService.confirm({
            key: 'deleteDialog',
            message:'Do you want to delete this record',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            accept: () => {
                let ids: number[] = [];
                if (typeDelete === 'ONE_DELETE') {
                    ids = [id]; // Đảm bảo id là một mảng
                } else if (typeDelete === 'MULTI_DELETE') {
                    ids = this.rowSelection.map(record => record.id);
                }
                this.devaningService.delete(ids).subscribe(() => {
                    this.loadAllData();
                    this.getAll(this.status);
                    this.messageService.add({ severity: 'success', summary: 'Delete', detail: this.localizePipe.transform('Youhavedeleted') });
                }, error => {
                    this.messageService.add({ severity: 'danger', summary: 'Delete', detail: error });
                });
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
