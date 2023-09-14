import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MiClaseAsignaturaPage } from './mi-clase-asignatura.page';

const routes: Routes = [
  {
    path: '',
    component: MiClaseAsignaturaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MiClaseAsignaturaPageRoutingModule {}
