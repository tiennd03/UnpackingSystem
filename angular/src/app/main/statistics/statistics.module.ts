import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { StatisticsComponent } from "./statistics.component";
import { AppCommonModule } from "@app/shared/common/app-common.module";
import { StatisticsRoutingModule } from "./statistics-routing.module";

@NgModule({
    declarations: [
        StatisticsComponent,
    ],
    imports: [
        StatisticsRoutingModule,
        AppCommonModule

    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
    ]
})

export class StatisticsModule { }
