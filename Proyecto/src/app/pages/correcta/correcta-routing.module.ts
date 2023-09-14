import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CorrectaPage } from './correcta.page';

const routes: Routes = [
  {
    path: '',
    component: CorrectaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CorrectaPageRoutingModule {}
