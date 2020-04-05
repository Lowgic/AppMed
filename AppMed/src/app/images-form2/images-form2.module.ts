import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImagesForm2PageRoutingModule } from './images-form2-routing.module';

import { ImagesForm2Page } from './images-form2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImagesForm2PageRoutingModule
  ],
  declarations: [ImagesForm2Page]
})
export class ImagesForm2PageModule {}
