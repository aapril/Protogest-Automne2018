import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListProtocolComponent } from './list-protocol.component';

const routes: Routes = [
  {
    path: '', component: ListProtocolComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListProtocolRoutingModule { }
