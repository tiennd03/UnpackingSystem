import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilebentrongComponent } from './filebentrong.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'filebentrong',
                component: FilebentrongComponent,
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
export class FilebentrongRoutingModule {}
