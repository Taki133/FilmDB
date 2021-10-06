import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// Belső router csak bejelentkezett felhasználói útvonalak
const routes: Routes = [
  {
    path: 'movies',
    loadChildren: () => import('./movies/movies.module').then( m => m.MoviesPageModule)
  },
  {
    path: 'addmovie',
    loadChildren: () => import('./addmovie/addmovie.module').then( m => m.AddmoviePageModule)
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class MembersRoutingModule { }
