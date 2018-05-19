import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertProvider } from '../../providers/alert/alert';
import { LaravelProvider } from '../../providers/laravel/laravel';



@IonicPage()
@Component({
  selector: 'page-drugs',
  templateUrl: 'drugs.html',
})
export class DrugsPage {

  constructor(private toastr: AlertProvider, private http: LaravelProvider,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DrugsPage');
    this.getAllDrugs();
  }
  drugs: any[] = [];



  addDrug(){
    this.navCtrl.push("AddDrugPage");
  }

  getAllDrugs() {
    this.http.index('drugs').subscribe((response) => {
      this.drugs = response['drugs'];
      console.log(this.drugs);
    }, error => {
      this.toastr.messenger('Could not load drugs');
    });
  }

}
