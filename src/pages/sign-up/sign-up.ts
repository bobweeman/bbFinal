import { AlertProvider } from './../../providers/alert/alert';
import { LaravelProvider } from './../../providers/laravel/laravel';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {  Validators, FormGroup, FormControl } from '@angular/forms';

/**
 * Generated class for the SignUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {

  constructor(private toaster:AlertProvider, public http:LaravelProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  regForm = new FormGroup({
    name: new FormControl(null, ([Validators.required, Validators.minLength(3)])),
    email: new FormControl(null, ([Validators.required, Validators.email])),
    password: new FormControl(null, ([Validators.required, Validators.minLength(5)])),
    user_type: new FormControl(null, ([Validators.required]))

  })

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }

  regData={
    name:'',
    email:'',
    password:'',
    access_level:''
  }

  buildData(){
    this.regData.name = this.regForm.controls['name'].value;
    this.regData.email = this.regForm.controls['email'].value;
    this.regData.password = this.regForm.controls['password'].value;
    this.regData.access_level = this.regForm.controls['user_type'].value;


  }

  register(){
    this.buildData();
    console.log(this.regData);
    this.http.addNewUser('user_registration',this.regData).subscribe((response)=>{
        this.toaster.messenger('Registration Successful');
        this.navCtrl.pop();
      },error=>{
        this.toaster.messenger('Registration Failed'); 
      });
  }



}
