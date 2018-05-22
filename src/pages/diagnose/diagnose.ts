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
      console.log(this.medicines);
    }, error => {
      this.toastr.messenger('Cannot load drugs');
    });
  }
  setPatient(){
    this.patient =this.navParams.data;
  }

  prescribtions(){
    this.drugging=true;
  }

  diagnosis={
    doctor_id:'',
    patient_id:'',
    diagnosis:'',
    dosage:'',
    quantity:0,
    drug_id:0
  }

  buildDiagnosis(data){
    this.diagnosis.doctor_id=localStorage.getItem('user_id');
    this.diagnosis.patient_id=this.navParams.data.id;
    this.diagnosis.diagnosis=this.diagnosisForm.controls['diagnosis'].value;
    this.diagnosis.drug_id=data;
  }

  diagnose(drug_id){
    this.buildDiagnosis(drug_id);
    this.navCtrl.push('DrugFrequencyPage',this.diagnosis);
  }

  
  

}
