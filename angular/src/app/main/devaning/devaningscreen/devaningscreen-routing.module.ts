import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DevaningScreenComponent } from './devaningscreen.component';

const routes: Routes = [{
    path: '',
    children: [
        {
            path: 'devaningscreen',
            component: DevaningScreenComponent,
            data: { permission: 'Pages.UPS.Devaning' }
        },
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DevaningScreenRoutingModule { }
