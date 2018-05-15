import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewPharmacyPage } from './new-pharmacy';

@NgModule({
  declarations: [
    NewPharmacyPage,
  ],
  imports: [
    IonicPageModule.forChild(NewPharmacyPage),
  ],
})
export class NewPharmacyPageModule {}
