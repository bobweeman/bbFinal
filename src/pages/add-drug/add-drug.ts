import { AlertProvider } from './../../providers/alert/alert';
import { LaravelProvider } from './../../providers/laravel/laravel';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';

/**
 * Generated class for the AddDrugPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-drug',
  templateUrl: 'add-drug.html',
})
export class AddDrugPage {

  constructor(private toastr:AlertProvider, private http:LaravelProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddDrugPage');
    this.getAllCategories();
  }
  categories: any[] = [];


  drugForm = new FormGroup({
    name: new FormControl(null, ([Validators.required, Validators.minLength(5)])),
    composition: new FormControl(null, ([Validators.required])),
    category_id: new FormControl(null, ([Validators.required])),
  })

  drugData={
    name:'',
    composition:'',
    drug_category_id:0
  }



  getAllCategories() {
    this.http.index('categories').subscribe((response) => {
      this.categories = response['drug_category'];
      console.log(this.categories);
    }, error => {
      this.toastr.messenger('Could not load categories');
    });
  }
  buildData(){
    this.drugData.name=this.drugForm.controls['name'].value;
    this.drugData.composition = this.drugForm.controls['composition'].value;
    this.drugData.drug_category_id = this.drugForm.controls['category_id'].value;
  }

  addDrug(){
    this.buildData();
    this.http.store('drugs',this.drugData).subscribe((response)=>{
        let message:string= response['message'];
        this.toastr.messenger(message);
        this.navCtrl.pop();
    },error=>{
      this.toastr.messenger("Error saving drug!!");
    });
  }
}
