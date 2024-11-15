import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                children: [
                    {
                        path: 'robing',
                        loadChildren: () => import('./robing/robing.module', )
                        .then((m) => m.RobingModule),
                    },
                ],
            },
        ]),
    ],
    exports: [RouterModule],
})
export class RobingRoutingModule {}

