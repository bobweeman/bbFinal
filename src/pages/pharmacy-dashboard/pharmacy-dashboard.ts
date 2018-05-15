import { LaravelProvider } from './../../providers/laravel/laravel';
import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

/**
 * Generated class for the PharmacyDashboardPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pharmacy-dashboard',
  templateUrl: 'pharmacy-dashboard.html'
})
export class PharmacyDashboardPage {

  addDrugsRoot = 'AddDrugsPage'
  stockDrugsRoot = 'StockDrugsPage'
  ordersRoot = 'OrdersPage'


  constructor(private http:LaravelProvider, public navCtrl: NavController) {
  }

  ionViewDidLoad() {
    this.checkShop();

  }


  user={
    id:''
  }

  // check if user has setup shop
  checkShop(){
      this.user.id=localStorage.getItem('user_id');
      this.http.store('check_shop',this.user).subscribe((response)=>{
        let count =response['count'];
        if(count >=1){
          this.setShopDetails();
        }else if(count <1){
          this.navCtrl.setRoot("NewPharmacyPage")
        }
      },error=>{

      })
  }


  setShopDetails(){
    this.http.store('my_pharmacy',this.user).subscribe((response=>{
        console.log(response);
    }),error=>{

    })
  }
 
 
}
