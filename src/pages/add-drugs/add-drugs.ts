import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertProvider } from '../../providers/alert/alert';
import { LaravelProvider } from '../../providers/laravel/laravel';
import { FormGroup, FormControl, Validators } from '@angular/forms';

/**
 * Generated class for the AddDrugsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-drugs',
  templateUrl: 'add-drugs.html',
})
export class AddDrugsPage {

  constructor(private toastr: AlertProvider, private http: LaravelProvider,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddDrugsPage');
    this.getAllDrugs();
    
  }
  subscribtionForm = new FormGroup({
    number: new FormControl(null, ([Validators.required])),
    expiry: new FormControl(null, ([Validators.required, Validators.minLength(5)])),
  })

  drugs:any[]=[];
  subscribing:boolean=false;
  subscribtionData={
    pharmacy_id:'',
    drug_id:'',
    number:'',
    expiry:''
  }

  getAllDrugs() {
    this.http.index('drugs').subscribe((response) => {
      this.drugs = response['drugs'];
      console.log(this.drugs);
    }, error => {
      this.toastr.messenger('Could not load drugs');
    });
  }

  buildSubscription(){
    this.subscribtionData.expiry=this.subscribtionForm.controls['expiry'].value;
    this.subscribtionData.number=this.subscribtionForm.controls['number'].value;
  }

  subscribe(){
    this.buildSubscription();
    this.http.store('drug_subscribtions',this.subscribtionData).subscribe((response)=>{
      this.toastr.messenger("Drug added to store");
      this.subscribing=false;
    },error=>{
      this.subscribing=false;
      this.toastr.messenger("Could not add drug to store");
    });
  }
  begin(drug_id) {
    this.subscribing=true;
    this.subscribtionData.drug_id=drug_id;
    this.subscribtionData.pharmacy_id=localStorage.getItem('pharmacy_id');
  }

}
