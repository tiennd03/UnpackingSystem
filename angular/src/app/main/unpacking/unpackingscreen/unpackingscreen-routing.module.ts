import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnpackingScreenComponent } from './unpackingscreen.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'unpackingscreen',
                component: UnpackingScreenComponent,
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
export class UnpackingScreenRoutingModule {}
