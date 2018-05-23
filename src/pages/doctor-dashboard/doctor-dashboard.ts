import { AlertProvider } from './../../providers/alert/alert';
import { LaravelProvider } from './../../providers/laravel/laravel';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';

/**
 * Generated class for the DoctorDashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-doctor-dashboard',
  templateUrl: 'doctor-dashboard.html',
})
export class DoctorDashboardPage {

  constructor(public app: App,private toastr:AlertProvider, private http:LaravelProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DoctorDashboardPage');
  }
  patients:any[]=[];
  
  query={
    name:''
  }

  diagnosis={
    doctor_id:'',
    patient_id:'',
    diagnosis:'N/A'
  }

  getPatients(event){
    this.query.name =event.target.value;
    this.http.store('patients',this.query).subscribe((response)=>{
      this.patients=response['patients'];
    },error=>{
      this.toastr.messenger('Cannot load patients');
    });
  }

  buildDiagnosis(id){
    this.diagnosis.doctor_id=localStorage.getItem('user_id');
    this.diagnosis.patient_id=id;
  }


  diagnose(patient){
    this.buildDiagnosis(patient.id);
    this.http.store('prescriptions',this.diagnosis).subscribe((response)=>{
      localStorage.setItem('diagnosis_slip',response['slip']);
      this.navCtrl.push("DiagnosePage", patient);
    },error=>{
      this.toastr.messenger('Could not set prescription');
      console.log(JSON.stringify(error));
    });
  }

  
//  sign out from application
signOut() {
  this.toastr.messenger('You have been logged out');
  // remove token
  localStorage.removeItem('jwt');
  
  // remove user access level
  localStorage.removeItem('logUserAccessLevel');
  // getout to login page
  this.app.getRootNav().setRoot("SignInPage");
}



}
