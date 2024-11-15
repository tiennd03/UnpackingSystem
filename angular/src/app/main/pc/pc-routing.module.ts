import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                children: [
                    {
                        path: 'pcstore',
                        loadChildren: () => import('./pcstore/pcstore.module', )
                        .then((m) => m.PcStoreModule),
                    },
                ],
            },
            {
                path: '',
                children: [
                    {
                        path: 'pchome',
                        loadChildren: () => import('./pchome/pchome.module', )
                        .then((m) => m.PcHomeModule),
                    },
                ],
            },
        ]),
    ],
    exports: [RouterModule],
})
export class PcRoutingModule {}

