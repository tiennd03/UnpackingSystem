import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DevaningModuleDto, DevaningModuleServiceProxy } from '@shared/service-proxies/service-proxies';
import { DateTime } from 'luxon';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';


@Component({
    selector: 'app-devaningscreen',
    templateUrl: './devaningscreen.component.html',
    styleUrls: ['./devaningscreen.component.less'],
    providers: [MessageService, ConfirmationService],
})
export class DevaningScreenComponent extends AppComponentBase implements OnInit {
    @ViewChild('dt1') dt1: Table | undefined;

    rowSelection: DevaningModuleDto
    cols: any[];
    devanedList: { devaningId: any, containerNo: string, actDevaningDateFinish: DateTime, actDevaningDate: DateTime, devaningStatus: string }[] = [];
    devaningList: { devaningId: any, renban: string, containerNo: string, actDevaningDate: DateTime }[] = [];
    readyList: { devaningId: any, renban: string, containerNo: string, planDevaningDate: DateTime, devaningStatus: string }[] = [];
    inProgressRecord;
    progress: number = 0;
    progressMessage: string = '';
    showDialog: boolean = true;

    constructor(
        injector: Injector,
        private _service: DevaningModuleServiceProxy,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {
        super(injector)
        this.cols = [
            { field: 'devaningId', header: 'ID' },
            { field: 'renban', header: 'Renban' },
            { field: 'containerNo', header: 'Container No' },
            { field: 'planDevaningDate', header: 'Plan Devaning Date' },
            { field: 'devaningStatus', header: 'Devaning Status' }
        ];
    }
    filter(value: string, field: string): void {
        if (this.dt1) {
            this.dt1.filter(value, field, 'contains');
        }
    }

    async ngOnInit(): Promise<void> {
        await this.getDevaningPlan()

        if (this.inProgressRecord) {
            this.updateProgress()
        }
    }

    async getDevaningPlan(): Promise<void> {
        try {
            const result = await this._service.getDevaningPlan().toPromise();

            this.devanedList = result
                .filter(item => item.devaningStatus === 'DEVANED' || item.devaningStatus === 'DEVANING')
                .map(item => ({
                    devaningId: item.id,
                    containerNo: item.containerNo,
                    actDevaningDateFinish: item.actDevaningDateFinish,
                    actDevaningDate: item.actDevaningDate,
                    devaningStatus: item.devaningStatus
                }))
                .sort((a, b) => b.devaningId - a.devaningId);

            this.devaningList = result
                .filter(item => item.devaningStatus === 'DEVANING')
                .map(item => ({
                    devaningId: item.id,
                    renban: item.renban,
                    containerNo: item.containerNo,
                    actDevaningDate: item.actDevaningDate,
                }));

            if (this.devaningList.length > 0) {
                this.inProgressRecord = this.devaningList.reduce((min, item) =>
                    item.devaningId < min.devaningId ? item : min, this.devaningList[0]);

                this.updateProgress();
            }

            this.readyList = result
                .filter(item => item.devaningStatus === 'READY')
                .map(item => ({
                    devaningId: item.id,
                    renban: item.renban,
                    containerNo: item.containerNo,
                    planDevaningDate: item.planDevaningDate,
                    devaningStatus: item.devaningStatus
                }));
        } catch (error) {
            console.error('Error fetching devaning plan:', error);
        }
    }

    updateProgress() {
        this.progress = 0;
        const updateInterval = 1000;
        const incrementPerInterval = 100 / (4 * 60 * 60);

        let interval = setInterval(() => {
            this.progress += incrementPerInterval;
            if (this.progress >= 100) {
                this.progress = 100;
                clearInterval(interval);

                if(this.showDialog){
                    this.showCompletedProgressDialog();
                }
            }
        }, updateInterval);
    }

    runProgressBar() {
        this.progress = 0;
        const totalTime = 1500;
        const stepTime = 30;
        const increment = 100 / (totalTime / stepTime);

        const interval = setInterval(() => {
            this.progress += increment;
            if (this.progress >= 100) {
                this.progress = 100;
                clearInterval(interval);

                this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Process Completed' });

                setTimeout(() => {
                    window.location.reload();
                }, 1500);

            }
        }, stepTime);
    }

    showCompletedProgressDialog() {
        this.confirmationService.confirm({
            key: 'CompletionDialog',
            message: 'Process has been completed. What do you want to do next?',
            header: 'Process Completed',
            icon: 'pi pi-info-circle',
            acceptLabel: 'Continue Progress',
            rejectLabel: 'Reject',
            accept: () => {
                this.messageService.add({ severity: 'info', summary: 'Continuing', detail: 'The process will continue running until "Finish" is clicked.' });
            },
            reject: () => {

            },
        });
    }

    updateStatusToDevaning(devaningId: any) {
        this._service.updateStatusToDevaning(devaningId)
            .subscribe(() => {
                this.getDevaningPlan();
            }, (error) => {
                console.error('Failed', error);
            });
    }

    finishDevModule(id: number) {
        this.message.confirm(this.l(''), 'FINISH DEVANING CONTAINER', (isConfirmed) => {
            if (isConfirmed) {
                this._service.finishDvnCont(id)
                    .subscribe(() => {
                        this.notify.success(this.l('FINISH Successfully '));
                        this.showDialog = false;
                        this.runProgressBar();
                    });
            }
        });
    }
}
