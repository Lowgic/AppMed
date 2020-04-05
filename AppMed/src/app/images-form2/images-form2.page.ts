import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-images-form2',
  templateUrl: './images-form2.page.html',
  styleUrls: ['./images-form2.page.scss'],
})
export class ImagesForm2Page implements OnInit {

  selectedImage: string;

  constructor(private modalController: ModalController) { }


  ngOnInit() {
  }

  getSelectedValue(event) {
    this.selectedImage = event.detail.value;
  }

  async closeModal() {
    const onClosedData: string = this.selectedImage;
    await this.modalController.dismiss(onClosedData);
  }

}
