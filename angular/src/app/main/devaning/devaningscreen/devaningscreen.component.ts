import { Component, ElementRef, Inject, Injector, NgZone, OnInit, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DevaningModuleServiceProxy } from '@shared/service-proxies/service-proxies';
import { MessageService } from 'primeng/api';


@Component({
    selector: 'app-devaningscreen',
    templateUrl: './devaningscreen.component.html',
    styleUrls: ['./devaningscreen.component.less'],
    providers: [MessageService],
})
export class DevaningScreenComponent extends AppComponentBase implements OnInit {

    counT_DEVANING;
    id;
    rowdata;
    devaningPlan;
    containerCurren;
    containerNext;
    containerNameCurrent;
    containerNameNext;
    renbanCurent;
    renbanNext;
    currentId;
    dateNow;
    arrayTest: any[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    private currentIndex = 0;
    private interval: any;

    constructor(
        injector: Injector,
        private _service: DevaningModuleServiceProxy,
        private renderer: Renderer2,
        private el: ElementRef,
        private router: Router,
        private ngZone: NgZone,
        private messageService: MessageService
    ) {
        super(injector)
    }

    ngOnInit() {
        this.fornumbersRange();
        this.startColorChangeInterval();
        // Thiết lập ngZone để k làm ảnh hưởng đến việc Devaning Container sau khi chuyển Router
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.ngZone.run(() => {
                    this.resetColor();
                    this.currentIndex = 0;
                    this.startColorChangeInterval();
                });
            }
        });

    }
    ngAfterViewInit() {
        this.getDevaningPlan();
        setInterval(() => {
            this.getTimeNow();
        }, 1000);
        console.log('ngAfterViewInit');
    }

    ngOnDestroy(): void {
        // clearTimeout(this.clearTimeLoadData);
    }

    startColorChangeInterval() {
        if (this.interval) {
            clearInterval(this.interval);
        }

        this.interval = setInterval(() => {
            this.changeColor();
        }, 5000);
    }

    changeColor() {
        const divElements = this.el.nativeElement.querySelectorAll('.plan_actual_item');

        if (this.currentIndex < divElements.length) {
            this.renderer.setStyle(
                divElements[this.currentIndex],
                'background-color',
                'green'
            );
            this.currentIndex++;
        } else {
            clearInterval(this.interval);
            this.currentIndex = 0;
            this.resetColor();
            this.startColorChangeInterval();
            this._service.finishDvnCont(this.containerCurren.id)
                .subscribe(() => {
                    this.notify.success(this.l('FINISH Successfully '));
                    this.getDevaningPlan();
                });
            console.log('done');

        }
    }
    resetColor() {
        const divElements = this.el.nativeElement.querySelectorAll('.plan_actual_item');
        divElements.forEach((element: any) => {
            this.renderer.setStyle(element, 'background-color', 'white');
        });
    }
    fornumbersProcess() {
        let numRange: number[] = [];
        for (let i = 1; i <= 100; i++) {
            numRange.push(i);
        }
        return numRange;
    }

    getTimeNow() {
        const d = new Date();
        const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        this.dateNow = (((d.getHours() + "").length == 1) ? ("0" + d.getHours()) : d.getHours()) + " : " + (((d.getMinutes() + "").length == 1) ? ("0" + d.getMinutes()) : d.getMinutes()) + " : " + (((d.getSeconds() + "").length == 1) ? ("0" + d.getSeconds()) : d.getSeconds()) + " ( " + (((month[d.getMonth()] + "").length == 1) ? ("0" + month[d.getMonth()]) : month[d.getMonth()]) + " - " + (((d.getDay() + "").length == 1) ? ("0" + d.getDay()) : d.getDay()) + " ) "
    }

    // Get Devaning Plan in Day

    getDevaningPlan() {
        this._service.getDevaningPlan()
            .subscribe((result) => {
                this.devaningPlan = result;
                this.containerCurren = this.devaningPlan.filter(item => item.status === 'DEVANING')[0];
                this.containerNameCurrent = this.containerCurren.container;
                this.renbanCurent = this.containerCurren.renban;
                this.currentId = this.containerCurren.id;

                this.containerNext = this.devaningPlan.filter(item => item.status === 'READY')[0];
                this.containerNameNext = this.containerNext.container;
                this.renbanNext = this.containerNext.renban;

            });
    }

    fornumbersRange() {
        let numRange: number[] = [];
        for (let i = 1; i <= this.devaningPlan; i++) {
            numRange.push(i);
        }
        return numRange;
    }


    finishDevModule(id: number) {
        this.message.confirm(this.l(''), 'FINISH CONTAINER CURRENT', (isConfirmed) => {
            if (isConfirmed) {
                this._service.finishDvnCont(id)
                    .subscribe(() => {
                        this.notify.success(this.l('FINISH Successfully '));
                        this.getDevaningPlan();
                        this.currentIndex = 0;
                        this.resetColor()
                        this.startColorChangeInterval();
                    });
            }
        });
    }
    checkStatusContainer(status: string): string {
        if (status === 'DEVANED') {
            return 'DEVANED';
        } else if (status === 'DEVANING') {
            return 'DEVANING';
        } else if (status === 'READY') {
            return 'READY';
        }
    }
}
