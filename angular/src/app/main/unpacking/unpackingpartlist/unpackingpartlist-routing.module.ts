import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnpackingPartlistComponent } from './unpackingpartlist.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'unpackingpartlist',
                component: UnpackingPartlistComponent,
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
export class UnpackingPartlistRoutingModule {}
