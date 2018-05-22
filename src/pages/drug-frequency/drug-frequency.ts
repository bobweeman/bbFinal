import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';

/**
 * Generated class for the DrugFrequencyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-drug-frequency',
  templateUrl: 'drug-frequency.html',
})
export class DrugFrequencyPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DrugFrequencyPage');
    console.log(this.navParams.data);
  }

  dosageForm = new FormGroup({
    number: new FormControl(null, ([Validators.required, Validators.minLength(5)])),
    times: new FormControl(null, ([Validators.required, Validators.minLength(5)])),
  })

  data:any[]=[];

  





}
