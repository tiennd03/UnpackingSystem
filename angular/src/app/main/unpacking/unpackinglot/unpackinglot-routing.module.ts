import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnpackingLotComponent } from './unpackinglot.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'unpackinglot',
                component: UnpackingLotComponent,
            },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UnpackingLotRoutingModule {}
