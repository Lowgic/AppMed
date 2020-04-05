import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImagesFormPageRoutingModule } from './images-form-routing.module';

import { ImagesFormPage } from './images-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImagesFormPageRoutingModule
  ],
  declarations: [ImagesFormPage]
})
export class ImagesFormPageModule {}
