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

  getPatients(event){
    this.query.name =event.target.value;
    this.http.store('patients',this.query).subscribe((response)=>{
      this.patients=response['patients'];
      console.log(this.patients)
    },error=>{
      this.toastr.messenger('Cannot load patients');
    });
  }


  diagnose(patient){
      this.navCtrl.push("DiagnosePage",patient);
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
