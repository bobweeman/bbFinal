import { AlertProvider } from './../../providers/alert/alert';
import { LaravelProvider } from './../../providers/laravel/laravel';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ItemSliding } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})
export class CategoriesPage {
  slidingItem='null';

  constructor(private toastr:AlertProvider, 
    private http:LaravelProvider, 
    public navCtrl: NavController, 
    public navParams: NavParams,
  ) {
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
  // doRefresh(refresher) {
  //   console.log('Begin async operation', refresher);

  //   setTimeout(() => {
  //     console.log('Async operation has ended');
  //     refresher.complete();
  //   }, 2000);
  // }

  // delete(slidingItem:ItemSliding){
  //     slidingItem.close();
  //   }
  }

