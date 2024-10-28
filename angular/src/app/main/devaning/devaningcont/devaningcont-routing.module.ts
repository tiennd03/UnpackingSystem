import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DevaningContComponent } from './devaningcont.component';

const routes: Routes = [{
    path: '',
    children: [
        {
            path: 'devaningcont',
            component: DevaningContComponent,
            data: { permission: 'Pages.UPS.Devaning' }
        },
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DevaningContRoutingModule { }
