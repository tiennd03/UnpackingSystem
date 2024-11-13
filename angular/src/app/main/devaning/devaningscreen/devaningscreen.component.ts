import { Component, ElementRef, Inject, Injector, NgZone, OnInit, Renderer2, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DevaningModuleDto, DevaningModuleServiceProxy } from '@shared/service-proxies/service-proxies';
import { error } from 'console';
import { result } from 'lodash-es';
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

    // counT_DEVANING;
    // id;
    // rowdata;
    // devaningPlan;
    // containerCurren;
    // containerNext;
    // containerNameCurrent;
    // containerNameNext;
    // renbanCurent;
    // renbanNext;
    // currentId;
    // dateNow;
    // arrayTest: any[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    // private currentIndex = 0;
    // private interval: any;
    // value: number = 0;

    // constructor(
    //     injector: Injector,
    //     private _service: DevaningModuleServiceProxy,
    //     private renderer: Renderer2,
    //     private el: ElementRef,
    //     private router: Router,
    //     private ngZone: NgZone,
    //     private messageService: MessageService
    // ) {
    //     super(injector)
    // }

    // ngOnInit() {
    //     this.fornumbersRange();
    //     this.startColorChangeInterval();
    //     // Thiết lập ngZone để k làm ảnh hưởng đến việc Devaning Container sau khi chuyển Router
    //     this.router.events.subscribe((event) => {
    //         if (event instanceof NavigationEnd) {
    //             this.ngZone.run(() => {
    //                 this.resetColor();
    //                 this.currentIndex = 0;
    //                 this.startColorChangeInterval();
    //             });
    //         }
    //     });

    // }
    // ngAfterViewInit() {
    //     this.getDevaningPlan();
    //     setInterval(() => {
    //         this.getTimeNow();
    //     }, 1000);
    //     console.log('ngAfterViewInit');
    // }

    // ngOnDestroy(): void {
    //     // clearTimeout(this.clearTimeLoadData);
    // }

    // startColorChangeInterval() {
    //     if (this.interval) {
    //         clearInterval(this.interval);
    //     }

    //     this.interval = setInterval(() => {
    //         this.changeColor();
    //     }, 5000);
    // }

    // changeColor() {
    //     const divElements = this.el.nativeElement.querySelectorAll('.plan_actual_item');

    //     if (this.currentIndex < divElements.length) {
    //         this.renderer.setStyle(
    //             divElements[this.currentIndex],
    //             'background-color',
    //             'green'
    //         );
    //         this.currentIndex++;
    //     } else {
    //         clearInterval(this.interval);
    //         this.currentIndex = 0;
    //         this.resetColor();
    //         this.startColorChangeInterval();
    //         this._service.finishDvnCont(this.containerCurren.id)
    //             .subscribe(() => {
    //                 this.notify.success(this.l('FINISH Successfully '));
    //                 this.getDevaningPlan();
    //             });
    //         console.log('done');

    //     }
    // }
    // resetColor() {
    //     const divElements = this.el.nativeElement.querySelectorAll('.plan_actual_item');
    //     divElements.forEach((element: any) => {
    //         this.renderer.setStyle(element, 'background-color', 'white');
    //     });
    // }
    // // fornumbersProcess() {
    // //     let numRange: number[] = [];
    // //     for (let i = 1; i <= 100; i++) {
    // //         numRange.push(i);
    // //     }
    // //     return numRange;
    // // }
    // calculateProgress() {
    //     // Ví dụ tính toán dựa trên số lượng DEVANED so với tổng số
    //     const completed = this.devaningPlan.filter(item => item.status === 'DEVANED').length;
    //     const total = this.devaningPlan.length;
    //     this.value = (completed / total) * 100;
    // }

    // getTimeNow() {
    //     const d = new Date();
    //     const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    //     this.dateNow = (((d.getHours() + "").length == 1) ? ("0" + d.getHours()) : d.getHours()) + " : " + (((d.getMinutes() + "").length == 1) ? ("0" + d.getMinutes()) : d.getMinutes()) + " : " + (((d.getSeconds() + "").length == 1) ? ("0" + d.getSeconds()) : d.getSeconds()) + " ( " + (((month[d.getMonth()] + "").length == 1) ? ("0" + month[d.getMonth()]) : month[d.getMonth()]) + " - " + (((d.getDay() + "").length == 1) ? ("0" + d.getDay()) : d.getDay()) + " ) "
    // }

    // // Get Devaning Plan in Day

    // getDevaningPlan() {
    //     this._service.getDevaningPlan()
    //         .subscribe((result) => {
    //             this.devaningPlan = result;
    //             this.containerCurren = this.devaningPlan.filter(item => item.status === 'DEVANING')[0];
    //             this.containerNameCurrent = this.containerCurren.container;
    //             this.renbanCurent = this.containerCurren.renban;
    //             this.currentId = this.containerCurren.id;

    //             this.containerNext = this.devaningPlan.filter(item => item.status === 'READY')[0];
    //             this.containerNameNext = this.containerNext.container;
    //             this.renbanNext = this.containerNext.renban;

    //         });
    // }

    // fornumbersRange() {
    //     let numRange: number[] = [];
    //     for (let i = 1; i <= this.devaningPlan; i++) {
    //         numRange.push(i);
    //     }
    //     return numRange;
    // }


    // finishDevModule(id: number) {
    //     this.message.confirm(this.l(''), 'FINISH CONTAINER CURRENT', (isConfirmed) => {
    //         if (isConfirmed) {
    //             this._service.finishDvnCont(id)
    //                 .subscribe(() => {
    //                     this.notify.success(this.l('FINISH Successfully '));
    //                     this.getDevaningPlan();
    //                     this.currentIndex = 0;
    //                     this.resetColor()
    //                     this.startColorChangeInterval();
    //                 });
    //         }
    //     });
    // }
    // checkStatusContainer(status: string): string {
    //     if (status === 'DEVANED') {
    //         return 'DEVANED';
    //     } else if (status === 'DEVANING') {
    //         return 'DEVANING';
    //     } else if (status === 'READY') {
    //         return 'READY';
    //     }
    // }

    rowSelection: DevaningModuleDto
    cols: any[];
    devanedList;
    devaningList: { devaningId: any, renban: string, containerNo: string, actDevaningDate: DateTime }[] = [];
    readyList: { devaningId: any, renban: string, containerNo: string, planDevaningDate: DateTime, devaningStatus: string }[] = [];
    inProgressRecord;
    progress: number = 0;
    progressMessage: string = '';

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

            this.devaningList = result
                .filter(item => item.devaningStatus === 'DEVANING')
                .map(item => ({
                    devaningId: item.id,
                    renban: item.renban,
                    containerNo: item.containerNo,
                    actDevaningDate: item.actDevaningDate
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

                this.showCompletedProgressDialog();
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
        this.message.confirm(this.l(''), 'FINISH CONTAINER CURRENT', (isConfirmed) => {
            if (isConfirmed) {
                this._service.finishDvnCont(id)
                    .subscribe(() => {
                        this.notify.success(this.l('FINISH Successfully '));
                        this.runProgressBar();
                    });
            }
        });
    }
}
