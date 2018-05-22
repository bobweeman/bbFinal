import { AlertProvider } from './../../providers/alert/alert';
import { LaravelProvider } from './../../providers/laravel/laravel';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';

/**
 * Generated class for the SignInPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignInPage {

  constructor(private toastr:AlertProvider, private http:LaravelProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  loginForm = new FormGroup({
    email: new FormControl(null, ([Validators.required, Validators.email])),
    password: new FormControl(null, ([Validators.required, Validators.minLength(5)])),
  })
  ionViewDidLoad() {
    console.log('ionViewDidLoad SignInPage');
  }

  signUp(){
    this.navCtrl.push("SignUpPage");
  }

  loginData={
    username:'',
    password:'',
    grant_type:'password',
    client_id:'2',
    client_secret:'FdCo4JXBS8UDm30B3jYvRpueEtol7cW581CHL742',
    scope:'*'
  }

  buildData(){
    this.loginData.username=this.loginForm.controls['email'].value;
    this.loginData.password = this.loginForm.controls['password'].value;
  }

  signIn(){
      this.buildData();
      this.http.authenticate(this.loginData).subscribe((response)=>{
        console.log(response);
        localStorage.setItem('jwt',response['access_token']);
        this.checkAccessLevel(this.loginData);
      },error=>{
        this.toastr.messenger('Login Failed!');
        console.log(JSON.stringify(error));
      });    
  }

  checkAccessLevel(data){
    this.http.store('access_level',data).subscribe((response)=>{
      let access_level = response['user']['access_level'];
      localStorage.setItem('user_id',response['user']['id']);
      localStorage.setItem('user_name', response['user']['name']);

      switch (access_level) {
        //User is a doctor
        case 1:
          this.toastr.messenger('Welcome Doctor');
          this.navCtrl.setRoot("DoctorTabsPage");

          break;
        // user is a pharmacist
        case 2:
          this.toastr.messenger('Welcome to your pharmacy');
          this.navCtrl.setRoot("PharmacyDashboardPage");

          break;
        // user is a patient
        case 3:
          this.toastr.messenger('Welcome');
          this.navCtrl.setRoot("PatientTabsPage");
          break;
        // user is administrator
        case 4:
          this.toastr.messenger('Welcome Administrator');
          this.navCtrl.setRoot("AdministratorTabsPage");
          break;

        default:
          this.toastr.messenger('You have no priviledges');

          break;
      }
    },error=>{
      console.log(error);
    });
  }

}
