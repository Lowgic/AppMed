import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Image } from "./image";

import { ModalController } from '@ionic/angular';
import { ImagesFormPage } from '../images-form/images-form.page';
import { ImagesForm2Page } from '../images-form2/images-form2.page';
import { Platform } from '@ionic/angular';
import { ApiService } from '../api.service';
import { Order } from '../order';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  
  // ion-select-options arrays
  types: Array<string>;
  scales: Array<string>;
  languages: Array<string>;
  campaigns: Array<string>;

  // Background img picker
  backgrounds: Image[];
  backgroundReturned: string;
  backgroundImage: Image;

  // Product img picker
  products: Image[];
  productReturned: string;
  productImage: Image;

  // Date picker
  minDate: string;
  maxDate: string;

  // Tooltips var 
  showArrow:boolean = true;
  showToggleTooltip:boolean = false;
  showToggleTooltip2:boolean = false;
  showToggleTooltip3:boolean = false;
  tooltipEvent:string = "press";

  //device var
  isBrowser:boolean;

  //format calc. var
  width: number;
  length: number;
  overflows: number;
  finalWidth: number;
  finalLength: number;
  widthScale: string;
  lengthScale: string;
  overflowsScale: string;
  
  // Validation var
  validations_form: FormGroup;
  validations_messages: any;

  constructor(
  public formBuilder: FormBuilder,
  public modalController: ModalController,
  private platform: Platform,
  private apiService: ApiService
  ) {

  this.minDate = new Date().toISOString();
  let today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth();
  let day = today.getDate();
  this.maxDate = new Date(year + 2, month, day).toISOString();

  this.types = ["Annonce","OOH/POS simple","OOH/POS complex","Autre"];
  
  this.scales = ["mm","cm","dm","m"];

  this.languages = ["Allemand","Anglais","Français","Chinois","Japonais","Russe",
                    "Coréen","Portugais","Espagnol","Italien","Arabe","Autre"];

  this.campaigns = ["Campagne1","Campagne2","Campagne3"];

  this.backgrounds = [
    new Image("https://via.placeholder.com/90x120/FF0000/FFFFFF?text=BG1", "Background1"),
    new Image("https://via.placeholder.com/90x120/00FF00/FFFFFF?text=BG2", "Background2"),
    new Image("https://via.placeholder.com/90x120/0000FF/FFFFFF?text=BG3", "Background3"),
  ];

  this.products = [
    new Image("https://via.placeholder.com/90x120/CCCCCC/000000?text=Product1", "Product1"),
    new Image("https://via.placeholder.com/90x120/CCCCCC/000000?text=Product2", "Product2"),
    new Image("https://via.placeholder.com/90x120/CCCCCC/000000?text=Product3", "Product3"),
  ];

  this.validations_form = this.formBuilder.group({
    name: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    widthVisibleFormat: new FormControl('', Validators.required),
    widthScale: new FormControl(this.scales[0], Validators.required),
    lengthVisibleFormat: new FormControl('', Validators.required),
    lengthScale: new FormControl(this.scales[0], Validators.required),
    overflows: new FormControl('', Validators.required),
    overflowsScale: new FormControl(this.scales[0], Validators.required),
    language: new FormControl('', Validators.required),
    date: new FormControl('',Validators.required),
    campaign: new FormControl('',Validators.required),
    background: new FormControl('',Validators.required),
    product: new FormControl('',Validators.required),
    addInfos: new FormControl()
  });

  this.validations_messages = {
    'name': { type: 'required', message: 'Le nom de la commande est requis.' },
    'type': { type: 'required', message: 'Le type de la commande est requis.' },
    'width': { type: 'required', message: 'La largeur du format est requise.' },
    'length': { type: 'required', message: 'La longeur du format est requise.' },
    'overflows': { type: 'required', message: 'Les débords du format sont requis.' },
    'language': { type: 'required', message: 'La langue de la commande est requise.' },
    'date': { type: 'required', message: 'La date d\'échéance de la commande est requise.' },
    'campaign': { type: 'required', message: 'La campagne de la commande est requise.' }
  }

}

  ngOnInit(){

    this.platform.ready().then(() => {
      if (this.platform.is('android') || this.platform.is('ios')) {
           this.isBrowser = false;
      }  else {
           this.isBrowser = true;
             }
      });

    this.finalWidth = 210;
    this.finalLength = 297;
    this.widthScale = "mm";
    this.lengthScale = "mm";
  }

  calculateFinalFormat(){
    let convertedLengthOverflows = 0;
    let convertedWidthOverflows = 0;

    this.width = this.validations_form.get('widthVisibleFormat').value;
    this.widthScale = this.validations_form.get('widthScale').value;
    this.length = this.validations_form.get('lengthVisibleFormat').value;
    this.lengthScale = this.validations_form.get('lengthScale').value;
    this.overflows = this.validations_form.get('overflows').value;
    this.overflowsScale = this.validations_form.get('overflowsScale').value;

   convertedWidthOverflows = this.convertScale(this.widthScale, this.overflowsScale, this.overflows)
   convertedLengthOverflows = this.convertScale(this.lengthScale, this.overflowsScale, this.overflows)

    this.finalWidth = this.width + 2*convertedWidthOverflows;
    this.finalLength = this.length + 2*convertedLengthOverflows;
  }

  convertScale(dimensionScale, overflowsScale, overflowsValue){
    let convertedOverflows = 0;
      switch(dimensionScale){
        case "mm": {
            switch(overflowsScale){
              case "mm":{convertedOverflows = overflowsValue; return convertedOverflows;}
              case "cm":{convertedOverflows = overflowsValue*10; return convertedOverflows;}
              case "dm":{convertedOverflows = overflowsValue*100; return convertedOverflows;}
              case "m": {convertedOverflows = overflowsValue*1000; return convertedOverflows;}
              }
          }
        case "cm": {
          switch(overflowsScale){
            case "mm":{convertedOverflows = overflowsValue/10; return convertedOverflows;}
            case "cm":{convertedOverflows = overflowsValue; return convertedOverflows;}
            case "dm":{convertedOverflows = overflowsValue*10; return convertedOverflows;}
            case "m": {convertedOverflows = overflowsValue*100; return convertedOverflows;}
            }
        }
        case "dm": {
          switch(overflowsScale){
            case "mm":{convertedOverflows = overflowsValue/100; return convertedOverflows;}
            case "cm":{convertedOverflows = overflowsValue/10; return convertedOverflows;}
            case "dm":{convertedOverflows = overflowsValue; return convertedOverflows;}
            case "m":{convertedOverflows = overflowsValue*10; return convertedOverflows;}
            }
        }
        case "m": {
          switch(overflowsScale){
            case "mm":{convertedOverflows = overflowsValue/1000; return convertedOverflows;}
            case "cm":{convertedOverflows = overflowsValue/100; return convertedOverflows;}
            case "dm":{convertedOverflows = overflowsValue/10; return convertedOverflows;}
            case "m": {convertedOverflows = overflowsValue; return convertedOverflows;}
            }
        }
      }
      
  }

  async openModal(chainModal2?:boolean) {
    const modal = await this.modalController.create({
      component: ImagesFormPage,
      componentProps: {
        campaignValue: this.validations_form.get('campaign').value,
        backgrounds: this.backgrounds
      }
    });
 
    modal.onDidDismiss().then((dataReturned) => {
      if (this.backgroundReturned !== null) {
        this.backgroundReturned = dataReturned.data;
        this.backgroundImage = this.backgrounds.find(i => i.value === this.backgroundReturned);
      }
      if(chainModal2){
      this.openModal2();
      }
    });
 
    return await modal.present();
  }

  async openModal2() {
    const modal = await this.modalController.create({
      component: ImagesForm2Page,
      componentProps: {
        campaignValue: this.validations_form.get('campaign').value,
        products: this.products
      }
    });
 
    modal.onDidDismiss().then((dataReturned) => {
      if (this.productReturned !== null) {
        this.productReturned = dataReturned.data;
        this.productImage = this.products.find(i => i.value === this.productReturned);
      }
    });
 
    return await modal.present();
  }

  createAnOrder(values){
      this.apiService.createOrder(values).subscribe((order: Order)=>{
        console.log("Order created, ", order);
      });
  }


  // A RAJ DANS TUTO
  onSubmit(values){
  
    this.createAnOrder(values);
  }
}

 
