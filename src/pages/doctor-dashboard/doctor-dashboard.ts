import { AlertProvider } from './../../providers/alert/alert';
import { LaravelProvider } from './../../providers/laravel/laravel';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(private toastr:AlertProvider, private http:LaravelProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DoctorDashboardPage');
  }
  patients:any[]=[];
  
  query={
    name:''
  }

  getPatients(event){
    console.log(event.target.value);
    this.query.name =event.target.value;
    this.http.store('patients',this.query).subscribe((response)=>{
      this.patients=response['patients'];
      console.log(this.patients);
    },error=>{
      this.toastr.messenger('Cannot load patients');
    });

  }
}
