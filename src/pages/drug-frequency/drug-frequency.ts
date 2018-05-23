import { AlertProvider } from './../../providers/alert/alert';
import { LaravelProvider } from './../../providers/laravel/laravel';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';

/**
 * Generated class for the DrugFrequencyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-drug-frequency',
  templateUrl: 'drug-frequency.html',
})
export class DrugFrequencyPage {

  constructor(private http:LaravelProvider,private toastr:AlertProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DrugFrequencyPage');
    console.log(this.navParams.data);
  }

  dosageForm = new FormGroup({
    number: new FormControl(null, ([Validators.required, Validators.minLength(5)])),
    times: new FormControl(null, ([Validators.required, Validators.minLength(5)])),
    duration: new FormControl(null, ([Validators.required])),
  })

  data:any[]=[];
  dosage:string='';
  quantity:number=0;
  finalObject={
    dosage: '',
    quantity: 0,
    drug_id: 0,
    prescription_id:''
  }
 
  buildFinalObject(){
    this.finalObject.drug_id = this.navParams.data;
    this.finalObject.prescription_id = localStorage.getItem('diagnosis_slip');
    this.dosage = this.dosageForm.controls['number'].value + "@" + this.dosageForm.controls['times'].value+" daily";
    this.finalObject.dosage = this.dosage;
    this.quantity = this.dosageForm.controls['number'].value * this.dosageForm.controls['times'].value * this.dosageForm.controls['duration'].value;
    this.finalObject.quantity=this.quantity;
  }


  prescribtions(){
    this.buildFinalObject();
    this.http.store('prescription_details',this.finalObject).subscribe((response)=>{
      this.navCtrl.pop();
      this.toastr.messenger('Drug added to prescription');
    },error=>{
      this.toastr.messenger('Could not add drug to prescription');
    });
  }



  
  





}
