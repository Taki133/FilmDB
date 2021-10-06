import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddmoviePage } from './addmovie.page';

const routes: Routes = [
  {
    path: '',
    component: AddmoviePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddmoviePageRoutingModule {}
