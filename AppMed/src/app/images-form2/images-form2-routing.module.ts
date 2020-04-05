import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImagesForm2Page } from './images-form2.page';

const routes: Routes = [
  {
    path: '',
    component: ImagesForm2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImagesForm2PageRoutingModule {}
