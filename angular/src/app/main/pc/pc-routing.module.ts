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
                        data: { permission: 'Pages.UPS.PC.Store' },
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
                        data: { permission: 'Pages.UPS.PC.Home' },
                    },
                ],
            },
        ]),
    ],
    exports: [RouterModule],
})
export class PcRoutingModule {}

