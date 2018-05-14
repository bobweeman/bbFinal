import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdministratorTabsPage } from './administrator-tabs';

@NgModule({
  declarations: [
    AdministratorTabsPage,
  ],
  imports: [
    IonicPageModule.forChild(AdministratorTabsPage),
  ]
})
export class AdministratorTabsPageModule {}
