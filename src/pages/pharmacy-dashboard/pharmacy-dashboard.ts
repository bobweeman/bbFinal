import { AlertProvider } from './../../providers/alert/alert';
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
  pharmDashRoot = 'PharmacyStatisticsPage'


  constructor(private toastr:AlertProvider, private http:LaravelProvider, public navCtrl: NavController) {
  }

  ionViewDidLoad() {
    this.checkShop();

  }


  user={
    id:''
  }

  shopDetails:any[]=[];

  // check if user has setup shop
  checkShop(){
      this.user.id=localStorage.getItem('user_id');
      this.http.store('check_shop',this.user).subscribe((response)=>{
        let count =response['count'];
        if(count ==1){
          // this.toastr.messenger("Welcome to your shop");
        }else if(count ==0){
          this.toastr.messenger("Please create a pharmacy");
          this.navCtrl.setRoot("NewPharmacyPage")
        }
      },error=>{
        this.toastr.messenger("Could not load pharmacy");
      })
  }


 
 
 
}
