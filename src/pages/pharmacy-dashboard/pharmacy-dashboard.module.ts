import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PharmacyDashboardPage } from './pharmacy-dashboard';

@NgModule({
  declarations: [
    PharmacyDashboardPage,
  ],
  imports: [
    IonicPageModule.forChild(PharmacyDashboardPage),
  ]
})
export class PharmacyDashboardPageModule {}
