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
                        path: 'statistics',
                        loadChildren: () => import('./statistics/statistics.module').then((m) => m.StatisticsModule),
                        data: { permission: 'Pages.Tenant.Dashboard' },
                    },
                    {
                        path: 'devaning',
                        loadChildren: () => import('./devaning/devaning.module').then(m => m.DevaningModule),
                        data: { permission: 'Pages.UPS' }
                    },
                    {
                        path: 'unpacking',
                        loadChildren: () => import('./unpacking/unpacking.module').then(m => m.UnpackingModule),
                        // data: { permission: 'Pages.UPS' }
                    },
                    {
                        path: 'pc',
                        loadChildren: () => import('./pc/pc.module').then(m => m.PcModule),
                        // data: { permission: 'Pages.UPS' }
                    },
                    {
                        path: 'robing',
                        loadChildren: () => import('./robing/robing.module').then(m => m.RobingModule),
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
