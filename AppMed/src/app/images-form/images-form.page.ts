import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-images-form',
  templateUrl: './images-form.page.html',
  styleUrls: ['./images-form.page.scss'],
})
export class ImagesFormPage implements OnInit {

  selectedImage: string;
  
  constructor(private modalController: ModalController) { 
  }

  ngOnInit() {
  }

  getSelectedValue(event){
    this.selectedImage = event.detail.value;
  }
 
  async closeModal() {
    const onClosedData: string = this.selectedImage;
    await this.modalController.dismiss(onClosedData);
  }

}
