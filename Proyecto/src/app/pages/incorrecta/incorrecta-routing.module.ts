import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IncorrectaPage } from './incorrecta.page';

const routes: Routes = [
  {
    path: '',
    component: IncorrectaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IncorrectaPageRoutingModule {}
