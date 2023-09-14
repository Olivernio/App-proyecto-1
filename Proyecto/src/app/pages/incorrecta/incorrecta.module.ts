import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IncorrectaPageRoutingModule } from './incorrecta-routing.module';

import { IncorrectaPage } from './incorrecta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IncorrectaPageRoutingModule
  ],
  declarations: [IncorrectaPage]
})
export class IncorrectaPageModule {}
