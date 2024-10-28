import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { FilebentrongComponent } from './filebentrong/filebentrong.component';


// const routes: Routes = [
//     {
//         path: '',
//         component: FilebentrongComponent,
//         pathMatch: 'full',
//     },
// ];

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                children: [
                    {
                        path: 'filebentrong',
                        loadChildren: () => import('./filebentrong/filebentrong.module', )
                        .then((m) => m.FilebentrongModule),
                    },
                ],
            },
        ]),
    ],
    exports: [RouterModule],
})
export class TesstmanhinhRoutingModule {}

