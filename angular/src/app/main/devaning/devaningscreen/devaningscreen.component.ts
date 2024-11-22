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
    showDialog: boolean = true;
    timeInSeconds: number = 0;
    showSetupTimeDialog: boolean = false; // Trạng thái của dialog
  hour: number = 0;
  minute: number = 0;
  second: number = 0;

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
            } else {
                this.inProgressRecord = null;
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
        const incrementPerInterval = 100 / 20;

        let interval = setInterval(() => {
            this.progress += incrementPerInterval;
            if (this.progress >= 100) {
                this.progress = 100;
                clearInterval(interval);

                if(this.showDialog && this.inProgressRecord){
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

                this.getDevaningPlan();
                // setTimeout(() => {
                //     window.location.reload();
                // }, 1500);

            }
        }, stepTime);
    }

    showCompletedProgressDialog() {
        this.confirmationService.confirm({
            key: 'SetupTimeDialog',
            message: 'Process has been completed. What do you want to do next?',
            header: 'Process Completed',
            icon: 'pi pi-info-circle',
            acceptLabel: 'Devan Next Container',
            rejectLabel: 'Continue Progress',
            accept: () => {
                this.finishDevModule(this.inProgressRecord.devaningId)
            },
            reject: () => {
                this.messageService.add({ severity: 'info', summary: 'Continuing', detail: 'The process will continue running until "Finish" is clicked.' });
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

    async finishDevModule(id: number) {
        const isConfirmed = await this.confirmAsync(this.l(''), 'FINISH DEVANING CONTAINER');
        if (isConfirmed) {
            try {
                await this._service.finishDvnCont(id).toPromise(); // Hoặc sử dụng lastValueFrom nếu toPromise đã deprecated
                this.notify.success(this.l('FINISH Successfully'));
                this.showDialog = false;
                this.runProgressBar();

                // Đợi getDevaningPlan hoàn thành
                await this.getDevaningPlan();

                this.progress = 0;

                if (this.inProgressRecord) {
                    this.showDialog = true;
                    this.updateProgress();
                } else {
                    this.messageService.add({
                        severity: 'info',
                        summary: 'No Container Devan',
                        detail: ''
                    });
                }
            } catch (error) {
                this.notify.error(this.l('Failed to finish'));
            }
        }
    }

    confirmAsync(message: string, title: string): Promise<boolean> {
        return new Promise((resolve) => {
            this.message.confirm(message, title, (isConfirmed) => {
                resolve(isConfirmed);
            });
        });
    }

    showTimeSetupDialog() {
        this.showSetupTimeDialog = true;
        // let hour = 0, minute = 0, second = 0;

        // this.confirmationService.confirm({
        //     key: 'CompletionDialog',
        //     message: `
        //         <ng-container>
        //             <label>Hours:
        //                 <input type="number" [(ngModel)]="hour" min="0" style="width: 50px;">
        //             </label>
        //             <label>Minutes:
        //                 <input type="number" [(ngModel)]="minute" min="0" max="59" style="width: 50px;">
        //             </label>
        //             <label>Seconds:
        //                 <input type="number" [(ngModel)]="second" min="0" max="59" style="width: 50px;">
        //             </label>
        //         </ng-container>
        //     `,
        //     header: 'Set Time for Devaning',
        //     accept: () => {
        //         // Chuyển đổi giờ, phút, giây sang giây
        //         this.timeInSeconds = hour * 3600 + minute * 60 + second;

        //         // Gọi updateProgress với thời gian đã thiết lập
        //         // this.updateProgress(this.timeInSeconds);
        //     },
        //     reject: () => {
        //         console.log('Setup cancelled');
        //     }
        // });
    }
}
