import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

/**
 * Generated class for the PatientPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-patient',
  templateUrl: 'patient.html'
})
export class PatientPage {

  patientCardsRoot = 'PatientCardsPage'
  patientMapRoot = 'PatientMapPage'


  constructor(public navCtrl: NavController) {}

}
