import { Component, Injector, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { RobingDto, RobingServiceProxy, UnpackingServiceProxy } from '@shared/service-proxies/service-proxies';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';
import * as moment from 'moment';

@Component({
    templateUrl: './robing.component.html',
    styleUrls: ['./robing.component.less'],
})
export class RobingComponent extends AppComponentBase implements OnInit {
    @ViewChild('paginator', { static: true }) paginator: Paginator;
    @ViewChild('dt1') dt1: Table | undefined;

    robingToday;
    partFail;
    partLoan;
    totalRobing;

    rowdata;
    selectedDiv: any;
    partNo: string;
    renban: string;
    supplier: string;
    moduleNo: string;
    robingTime: any;
    description: string;

    increaseToday;
    increaseFail;
    increaseLoan;
    increaseTotal;

    arrayTest = ['1', '2', '3', '4', '5']
    listPartInModule;
    disable;

    constructor(
        injector: Injector,
        private _service: RobingServiceProxy,
        private _unpackingProxy: UnpackingServiceProxy,
    ) {
        super(injector);

    }
    ngOnInit(): void {
        this.getAllRobing()
    }

    getAllRobing(partNo?) {
        this._service.getAllRobing(partNo)
            .subscribe((res) => {
                this.rowdata = res

                if (typeof this.totalRobing === 'undefined') {
                    this.totalRobing = this.rowdata.length;
                    this.partFail = this.rowdata.filter((e) => e.type == "FAILD").length
                    this.partLoan = this.rowdata.filter((e) => e.type == "LOAN").length

                    const currentDate = moment();

                    this.robingToday = this.rowdata.filter((e) => {
                        if (e.creationTime) {
                            const creationDate = moment(e.creationTime);
                            return creationDate.isSame(currentDate, 'day');
                        }
                        return false;
                    }).length;

                    this.increaseFail
                }

            }, (error) => {
                this.notify.error('ERROR', error)
            })
    }

    getPartInModule() {
        this._unpackingProxy.getPartInModule(this.moduleNo).subscribe((res) => {
            this.listPartInModule = res
        })
    }

    searchOrClear(type?) {
        this.partNo = (type === "Clear") ? '' : this.partNo;
        this.getAllRobing(this.partNo);
    }

    onchangeSelection(item, index) {
        if (this.selectedDiv === item) {
            this.selectedDiv = null;
        } else {
            this.selectedDiv = item;
        }
        // ?? error
        //this.robingDetail = this.rowdata[index]
        //Framework lỗi khi đặt [disabled]="selectedDiv.type == 'LOAN' || selectedDiv.type == 'PENDING'"

        this.disable = this.selectedDiv.type === 'LOAN' || this.selectedDiv.type === 'PENDING';


        this.renban = this.rowdata[index].renban
        this.supplier = this.rowdata[index].supplier
        this.robingTime = this.rowdata[index].creationTime
        this.moduleNo = this.rowdata[index].moduleNo
        this.description = this.rowdata[index].description

        this.getPartInModule()


        // const iconRecommed = document.querySelector<HTMLElement>('.recommeded-icon .icon');
        // iconRecommed.classList.add('icon-slide');
        // setTimeout(()=>{
        //     iconRecommed.classList.remove('icon-slide')
        // },1000)

    }

    requestGiveBack() {
        this.message.confirm(this.l(''), 'REQUEST GIVE BACK TO ' + this.supplier, (isConfirmed) => {
            if (isConfirmed) {
                this._service.requestGiveBack(this.selectedDiv.id).subscribe(()=>{
                    this.notify.success('Request Success')
                    this.getAllRobing()
                },(error)=>{
                    this.notify.error('Request failed',error)
                })
            }
        });
    }

    checkTypeRobing(robingStatus: string): string {
        if (robingStatus === 'PENDING') {
          return 'PENDING';
        }
      }
}
