import { AlertProvider } from './../../providers/alert/alert';
import { LaravelProvider } from './../../providers/laravel/laravel';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PatientCardsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-patient-cards',
  templateUrl: 'patient-cards.html',
})
export class PatientCardsPage {

  constructor(private toastr:AlertProvider, private http:LaravelProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PatientCardsPage');
    this.getDiagnosis();
  }

  patient={
    id:''
  }

  diagnosis:any[]=[];


  getDiagnosis(){
    this.patient.id=localStorage.getItem('user_id');
    this.http.store('my_diagnosis',this.patient).subscribe((response)=>{
        this.diagnosis =response['data'];
    },error=>{
        this.toastr.messenger("Could not get your reports");
    });
  }

 
  viewQr(qr){
     
      this.navCtrl.push("ViewQrPage",qr);
  }

}
