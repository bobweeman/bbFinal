import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertProvider } from '../../providers/alert/alert';
import { LaravelProvider } from '../../providers/laravel/laravel';

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
  }

  drugs:any[]=[];


  getAllDrugs() {
    this.http.index('drugs').subscribe((response) => {
      this.drugs = response['drugs'];
    }, error => {
      this.toastr.messenger('Could not load drugs');
    });
  }

  subscribe(){
    
  }

}
