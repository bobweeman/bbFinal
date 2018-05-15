import { AlertProvider } from './../../providers/alert/alert';
import { LaravelProvider } from './../../providers/laravel/laravel';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CategoriesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})
export class CategoriesPage {

  constructor(private toastr:AlertProvider, private http:LaravelProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoriesPage');
    this.getAllCategories();
  }

 
  categories:any[]=[];

  addCategory(){
    this.navCtrl.push("AddCategoryPage");
  }


  getAllCategories(){
    this.http.index('categories').subscribe((response)=>{
      this.categories =response['drug_category'];
      console.log(this.categories);
    },error=>{
      this.toastr.messenger('Could not load categories');
    });
  }

  

 
}
