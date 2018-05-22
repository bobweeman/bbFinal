import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { AlertProvider } from '../../providers/alert/alert';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public app: App,private toastr:AlertProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DoctorDashboardPage');
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
