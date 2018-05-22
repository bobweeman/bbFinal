import { AlertProvider } from './../../providers/alert/alert';
import { LaravelProvider } from './../../providers/laravel/laravel';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';

/**
 * Generated class for the AddCategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-category',
  templateUrl: 'add-category.html',
})
export class AddCategoryPage {

  constructor(private toastr:AlertProvider, public navCtrl: NavController, public app: App,public navParams: NavParams,private http:LaravelProvider) {
  }

  categoryForm = new FormGroup({
    name: new FormControl(null, ([Validators.required, Validators.minLength(2)])),
  })

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddCategoryPage');
  }

  categoryData={
    name:''
  }


  buildData(){
    this.categoryData.name=this.categoryForm.controls['name'].value;
  }
  addCategory(){
    this.buildData();
    this.http.store('categories',this.categoryData).subscribe((response)=>{
      let message:string = response['message'];
      this.toastr.messenger(message);
      this.navCtrl.pop();
    },error=>{
      this.toastr.messenger("Failed to create category");
      this.navCtrl.popTo("CategoryPage");
    });
  }

//  sign out from application
signOut() {
  this.toastr.messenger('You have been logged out');
  // remove token
  localStorage.removeItem('jwt');
  
  // remove user access level
  localStorage.removeItem('logUserAccessLevel');
  // getout to login page
  this.app.getRootNav().setRoot("SignInPage");
}
}
