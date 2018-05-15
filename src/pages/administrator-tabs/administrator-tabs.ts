import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

/**
 * Generated class for the AdministratorTabsPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-administrator-tabs',
  templateUrl: 'administrator-tabs.html'
})
export class AdministratorTabsPage {

  drugsRoot = 'DrugsPage'
  categoriesRoot = 'CategoriesPage'


  constructor(public navCtrl: NavController) {}

}
