import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CorrectaPageRoutingModule } from './correcta-routing.module';

import { CorrectaPage } from './correcta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CorrectaPageRoutingModule
  ],
  declarations: [CorrectaPage]
})
export class CorrectaPageModule {}
