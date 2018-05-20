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
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  delete(category){
  //  for(i =0; i< this.categories.length; i++){
  //    if(this.categories[i]==category){
  //      this.categories.splice(i, 1);
  //    }
  //  }

  for(category=0; category<this.categories.length; category++){
    if(this.categories[category]==category){
      this.categories.splice(category, 1);
    }
  }
  }

}