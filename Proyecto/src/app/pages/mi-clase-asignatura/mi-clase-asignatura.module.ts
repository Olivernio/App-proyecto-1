import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MiClaseAsignaturaPageRoutingModule } from './mi-clase-asignatura-routing.module';

import { MiClaseAsignaturaPage } from './mi-clase-asignatura.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MiClaseAsignaturaPageRoutingModule
  ],
  declarations: [MiClaseAsignaturaPage]
})
export class MiClaseAsignaturaPageModule {}
