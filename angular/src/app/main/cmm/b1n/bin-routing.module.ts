import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CmmBinComponent } from './bin.component';

const routes: Routes = [
    {
        path: '',
        component: CmmBinComponent,
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CmmBinRoutingModule {}
