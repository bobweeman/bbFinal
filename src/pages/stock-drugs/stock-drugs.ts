import { AlertProvider } from './../../providers/alert/alert';
import { LaravelProvider } from './../../providers/laravel/laravel';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';

/**
 * Generated class for the StockDrugsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-stock-drugs',
  templateUrl: 'stock-drugs.html',
})
export class StockDrugsPage {

  constructor(private toastr:AlertProvider, private http:LaravelProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StockDrugsPage');
    this.prepareData();
    this.getMyShopDrugs();
  }

  stockForm = new FormGroup({
    number: new FormControl(null, ([Validators.required])),
  })

  subscribedDrugs:any[]=[];
  stocking:boolean=false;

  stockData = {
    pharmacy_id: '',
    drug_id: '',
    number: '',
  }
  data={
    pharmacy_id:''
  }

  prepareData(){
    this.data.pharmacy_id=localStorage.getItem('pharmacy_id');
  }

  buildStock() {
    this.stockData.number = this.stockForm.controls['number'].value;
  }


  getMyShopDrugs(){
    this.http.store("shop_drugs",this.data).subscribe((response)=>{
      this.subscribedDrugs=response['drugs'];    
    },error=>{
      this.toastr.messenger('Could not fetch your drugs');
    });
  }

  begin(drug_id) {
    this.stocking = true;
    this.stockData.drug_id = drug_id;
    this.stockData.pharmacy_id = localStorage.getItem('pharmacy_id');
  }

  stock() {
    this.buildStock();
    this.http.update('drug_subscribtions',this.stockData.drug_id ,this.stockData).subscribe((response) => {
      this.toastr.messenger("Stock updated");
      this.stocking = false;
    }, error => {
      this.stocking = false;
      this.toastr.messenger("Could not add drug to store");
    });
  }

}
