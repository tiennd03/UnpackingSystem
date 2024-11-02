import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                children: [
                    {
                        path: 'devaningcont',
                        loadChildren: () => import('./devaningcont/devaningcont.module', ).then((m) => m.DevaningContModule),
                        data: { permission: 'Pages.UPS.Devaning' },
                    },
                ],
            },
            {
                path: '',
                children: [
                    {
                        path: 'devaningscreen',
                        loadChildren: () => import('./devaningscreen/devaningscreen.module', ).then((m) => m.DevaningScreenModule),
                        data: { permission: 'Pages.UPS.Devaning' },
                    },
                ],
            },
        ]),
    ],
    exports: [RouterModule],
})
export class DevaningRoutingModule {}
