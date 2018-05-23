import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ViewQrPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-qr',
  templateUrl: 'view-qr.html',
})
export class ViewQrPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewQrPage');
    this.setQrurl();
    
  }
  
  qrSource:any='';

  setQrurl(){
    this.qrSource ="http://80.240.19.121/storage/images/qrcodes/"+this.navParams.data;
    console.log(this.qrSource);
  }

}
