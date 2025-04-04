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
    countdownInterval: any;

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
        if (this.timeInSeconds <= 0) {
            console.warn('Invalid time. Progress update will not run.');
            this.messageService.add({ severity: 'warn', summary: 'Please enter time devan or Click Finish'});
            return;
        } else {
            this.progress = 0;
            const updateInterval = 1000;
            const incrementPerInterval = 100 / this.timeInSeconds;

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
    }

    runProgressBar() {
        this.timeInSeconds = 1
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

                setTimeout(() => {
                    if (this. inProgressRecord) {
                        this.hour = 0
                        this.second = 0
                        this.minute = 0
                        this.timeInSeconds = 0;
                    }
                }, 200);

            }
        }, stepTime);
    }

    showCompletedProgressDialog() {
        this.confirmationService.confirm({
            key: 'CompletionDialog',
            message: 'Process has been completed. What do you want to do next?',
            header: 'Process Completed',
            icon: 'pi pi-info-circle',
            acceptLabel: 'Devan Next Container',
            rejectLabel: 'Continue Progress',
            accept: () => {
                this.finishDevModule(this.inProgressRecord.devaningId)
                this.timeInSeconds = 0;
            },
            reject: () => {
                this.messageService.add({ severity: 'info', summary: 'Continuing', detail: 'The process will continue running until "Finish" is clicked.' });
                this.timeInSeconds = 0;
            },
        });
    }

    updateStatusToDevaning(devaningId: any) {
        this.timeInSeconds = 0;
        this.showDialog = true;
        this._service.updateStatusToDevaning(devaningId)
            .subscribe(() => {
                this.getDevaningPlan();
                this.updateProgress();
            }, (error) => {
                console.error('Failed', error);
            });
    }

    async finishDevModule(id: number) {
        if (!this.isGranted('Pages.UPS.Devaning.FinishDvn')) {
            this.messageService.add({severity:'warn', summary:'Permission invalid', detail:'Your permission can not do this action'});
            return;
        }
        const isConfirmed = await this.confirmAsync(this.l(''), 'FINISH DEVANING CONTAINER');
        if (isConfirmed) {
            try {
                await this._service.finishDvnCont(id).toPromise();
                this.notify.success(this.l('FINISH Successfully'));
                this.showDialog = false;
                this.runProgressBar();

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
    }

    setTime() {
        this.timeInSeconds = this.hour * 3600 + this.minute * 60 + this.second;

        if (this.timeInSeconds > 0 && this.inProgressRecord) {
            console.log(`Time set: ${this.timeInSeconds} seconds`);
            this.showSetupTimeDialog = false;
            this.updateProgress();
            this.startCountdown();
          } else if (this.timeInSeconds > 0){
              console.log(`Time set: ${this.timeInSeconds} seconds`);
              this.showSetupTimeDialog = false;
              this.startCountdown();
          } else {
            this.messageService.add({severity:'warn', summary:'Invalid Time'})
          }
      }

      cancelSetupTime() {
        console.log('Setup cancelled');
        this.showSetupTimeDialog = false;
    }

    getFormattedTime(): string {
        const hours = Math.floor(this.timeInSeconds / 3600);
        const minutes = Math.floor((this.timeInSeconds % 3600) / 60);
        const seconds = this.timeInSeconds % 60;
    
        // Đảm bảo luôn hiển thị 2 chữ số bằng cách thêm '0' nếu cần
        const formattedHours = hours.toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = seconds.toString().padStart(2, '0');
    
        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    }

    startCountdown(): void {
        if (this.countdownInterval) {
            clearInterval(this.countdownInterval); // Đảm bảo không có bộ đếm nào đang chạy
        }
    
        this.countdownInterval = setInterval(() => {
            if (this.timeInSeconds > 0) {
                this.timeInSeconds--;
            } else {
                clearInterval(this.countdownInterval); // Dừng khi đếm ngược kết thúc
                console.log('Countdown finished!');
            }
        }, 1000); // Lặp lại mỗi giây
    }
}
