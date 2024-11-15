import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PcHomeComponent } from './pchome.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'pchome',
                component: PcHomeComponent,
                data: {
                    // permission: 'Pages.GHS.Approval'
                }
            },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PcHomeRoutingModule {}
