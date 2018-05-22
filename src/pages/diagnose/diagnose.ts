import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';

/**
 * Generated class for the DiagnosePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-diagnose',
  templateUrl: 'diagnose.html',
})
export class DiagnosePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DiagnosePage');
    this.setPatient();
  }

  diagnoseForm = new FormGroup({
    diagnosis: new FormControl(null, ([Validators.required, Validators.minLength(5)])),
  })

  patient={

  }
  
  setPatient(){
    this.patient =this.navParams.data;
  }

  
  

}
