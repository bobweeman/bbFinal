import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PharmacyStatisticsPage } from './pharmacy-statistics';

@NgModule({
  declarations: [
    PharmacyStatisticsPage,
  ],
  imports: [
    IonicPageModule.forChild(PharmacyStatisticsPage),
  ],
})
export class PharmacyStatisticsPageModule {}
