import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RobingComponent } from './robing.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'robing',
                component: RobingComponent,
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
export class RobingRoutingModule {}
