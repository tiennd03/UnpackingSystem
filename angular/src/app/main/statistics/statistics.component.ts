import { Component, Injector, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { AppComponentBase } from "@shared/common/app-component-base";
import { DevaningModuleServiceProxy, PcHomeServiceProxy, PcStoreServiceProxy, RobingServiceProxy, UnpackingServiceProxy } from "@shared/service-proxies/service-proxies";
import { Paginator } from "primeng/paginator";

@Component({
    selector: 'statistics',
    templateUrl: './statistics.component.html',
    styleUrls: ['./statistics.component.less'],
})
export class StatisticsComponent extends AppComponentBase implements OnInit {
    @ViewChild('paginator', { static: true }) paginator: Paginator;

    multi = [
        {
            "name": "Devaning",
            "series": [
                {
                    "name": "Plan",
                    "value": 30
                },
                {
                    "name": "Actual",
                    "value": 25
                }
            ]
        },

        {
            "name": "Unpacking",
            "series": [
                {
                    "name": "Plan",
                    "value": 50
                },
                {
                    "name": "Actual",
                    "value": 25
                }
            ]
        },

        {
            "name": "Pc",
            "series": [
                {
                    "name": "Plan",
                    "value": 100
                },
                {
                    "name": "Actual",
                    "value": 10
                }
            ]
        }
    ];

    view: any[] = [,];
        // options
        showXAxis: boolean = true;
        showYAxis: boolean = true;
        gradient: boolean = true;
        showLegend: boolean = true;
        showXAxisLabel: boolean = true;
        xAxisLabel: string = 'Actual';
        showYAxisLabel: boolean = true;
        yAxisLabel: string = 'Plan';
        legendTitle: string = 'Time';

        colorScheme = {
            domain: ['#5AA454', '#C7B42C', '#AAAAAA'],
        };

        countContainer: number;
        countRobing : number;
        countModule : number;
        countPart : number;
        countPcStore : number;
        countPcHome : number;

        constructor(
            injector: Injector,
            private _devaningService: DevaningModuleServiceProxy,
            private _robingService: RobingServiceProxy,
            private _unpackingService: UnpackingServiceProxy,
            private _pcStoreService: PcStoreServiceProxy,
            private _pcHomeService: PcHomeServiceProxy,
            private router: Router
        ) {
            super(injector)
        }
    ngOnInit(): void {
        this.getContainer();
        this.getRobing();
        this.getModule();
        this.getPcStore();
        this.getPcHome();
        this.getPart()
    }

    openRoute(route) {
        if (route == 'dvnContainer') {
            this.router.navigate(['/app/main/devaning/devaningcont/devaningcont']);
        }
        else if (route == 'robing') {
            this.router.navigate(['/app/main/robing/robing/robing']);
        }
    }

    getContainer() {
        this._devaningService.getAll(0)
            .subscribe((result) => {
                this.countContainer = result.length;
            });
    }
    getRobing(){
        this._robingService.getAllRobing('').subscribe((result) => {
            this.countRobing = result.length;
        });
    }
    getModule(){
        this._unpackingService.getAll('','','','','',).subscribe((result) => {
                this.countModule = result.length;
            });
    }
    getPart(){
        this._unpackingService.getAllPartList('','','').subscribe((result) => {
                this.countPart = result.length;
            });
    }
    getPcStore(){
        this._pcStoreService.getAll('','').subscribe((result) => {
            this.countPcStore = result.length;
        });
    }
    getPcHome(){
        this._pcHomeService.getAll('','').subscribe((result) => {
            this.countPcHome = result.length;
        });
    }
}
