import { AlertProvider } from './../../providers/alert/alert';
import { LaravelProvider } from './../../providers/laravel/laravel';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PharmacyStatisticsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pharmacy-statistics',
  templateUrl: 'pharmacy-statistics.html',
})
export class PharmacyStatisticsPage {

  constructor(private toastr:AlertProvider, private http:LaravelProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PharmacyStatisticsPage');
    this.setShopDetails();
  }


  user = {
    id: ''
  }

  shopDetails={};

  setShopDetails() {
    this.user.id = localStorage.getItem('user_id');
    this.http.store('my_pharmacy', this.user).subscribe((response => {
      this.shopDetails = response['shop'];
      localStorage.setItem('pharmacy_id',response['shop']['id']);
      console.log(this.shopDetails);
    }), error => {
      this.toastr.messenger("Failed to fetch shop");
    })
  }

}
