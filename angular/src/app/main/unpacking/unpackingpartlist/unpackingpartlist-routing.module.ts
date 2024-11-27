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
            },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UnpackingPartlistRoutingModule {}
