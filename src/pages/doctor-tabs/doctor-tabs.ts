import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

/**
 * Generated class for the DoctorTabsPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-doctor-tabs',
  templateUrl: 'doctor-tabs.html'
})
export class DoctorTabsPage {

  dashboardRoot = 'DoctorDashboardPage'
  searchRoot = 'SearchPatientPage'
 

  constructor(public navCtrl: NavController) {}

}
