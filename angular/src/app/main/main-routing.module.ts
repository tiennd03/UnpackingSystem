import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                children: [
                    {
                        path: 'dashboard',
                        loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
                        data: { permission: 'Pages.Tenant.Dashboard' },
                    },
                    {
                        path: 'devaning',
                        loadChildren: () => import('./devaning/devaning.module').then(m => m.DevaningModule),
                        data: { permission: 'Pages.UPS' }
                    },
                    {
                        path: 'tesstmanhinh',
                        loadChildren: () => import('./tesstmanhinh/tesstmanhinh.module').then(m => m.TesstmanhinhModule),
                        // data: { permission: 'Pages.UPS' }
                    },
                    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
                    { path: '**', redirectTo: 'dashboard' },
                ],
            },
        ]),
    ],
    exports: [RouterModule],
})
export class MainRoutingModule {}
