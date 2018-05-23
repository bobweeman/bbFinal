import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertProvider } from '../../providers/alert/alert';
import { LaravelProvider } from '../../providers/laravel/laravel';

/**
 * Generated class for the DiagnosePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-diagnose',
  templateUrl: 'diagnose.html',
})
export class DiagnosePage {

  constructor(private toastr:AlertProvider, private http:LaravelProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DiagnosePage');
    this.setPatient();
  }

  diagnosisForm = new FormGroup({
    diagnosis: new FormControl(null, ([Validators.required, Validators.minLength(5)])),
  })
  query = {
    name: ''
  }

  drugging:boolean=false;

  patient={}
  medicines:any[]=[];
  
  getDrugs(event) {
    this.query.name = event.target.value;
    this.http.store('search_drugs', this.query).subscribe((response) => {
      this.medicines = response['drugs'];
    }, error => {
      this.toastr.messenger('Cannot load drugs');
    });
  }
  setPatient(){
    this.patient =this.navParams.data;
  }

  prescribtions(){
    this.drugging=true;
    this.diagnose();
  }

  diagnosis={
       diagnosis:'',
    }

  buildDiagnosis(){
    this.diagnosis.diagnosis=this.diagnosisForm.controls['diagnosis'].value;
  }

  diagnose(){
    this.buildDiagnosis();
    let id= localStorage.getItem('diagnosis_slip');
    this.http.update('prescriptions',id,this.diagnosis).subscribe((response=>{
      this.toastr.messenger('Diagnosis created');
    }),error=>{
      this.toastr.messenger("Could not add diagnosis");  
    });
  }

  assignDrugData={
    doctor_id:'',
    prescribtion_id:'',
    drug_id:'',
    dosage:'',
    quantity:''

  }

  assignDrug(drug_id){
    this.navCtrl.push('DrugFrequencyPage', drug_id);
  }

  
  

}
