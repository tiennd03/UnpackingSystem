import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                children: [
                    {
                        path: 'unpackinglot',
                        loadChildren: () => import('./unpackinglot/unpackinglot.module', )
                        .then((m) => m.UnpackingLotModule),
                        data: { permission: 'Pages.UPS.Unpacking' },
                    },
                ],
            },
            {
                path: '',
                children: [
                    {
                        path: 'unpackingpartlist',
                        loadChildren: () => import('./unpackingpartlist/unpackingpartlist.module', )
                        .then((m) => m.UnpackingPartlistModule),
                        data: { permission: 'Pages.UPS.Unpacking' },
                    },
                ],
            },
            {
                path: '',
                children: [
                    {
                        path: 'unpackingscreen',
                        loadChildren: () => import('./unpackingscreen/unpackingscreen.module', )
                        .then((m) => m.UnpackingScreenModule),
                        data: { permission: 'Pages.UPS.Unpacking' },
                    },
                ],
            },
        ]),
    ],
    exports: [RouterModule],
})
export class UnpackingRoutingModule {}

