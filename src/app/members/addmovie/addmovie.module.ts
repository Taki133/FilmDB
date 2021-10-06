import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddmoviePageRoutingModule } from './addmovie-routing.module';

import { AddmoviePage } from './addmovie.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddmoviePageRoutingModule
  ],
  declarations: [AddmoviePage]
})
export class AddmoviePageModule {}
