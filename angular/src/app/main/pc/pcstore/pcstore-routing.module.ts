import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PcStoreComponent } from './pcstore.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'pcstore',
                component: PcStoreComponent,
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
export class PcStoreRoutingModule {}
