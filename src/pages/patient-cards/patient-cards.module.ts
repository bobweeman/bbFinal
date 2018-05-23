import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PatientCardsPage } from './patient-cards';

@NgModule({
  declarations: [
    PatientCardsPage,
  ],
  imports: [
    IonicPageModule.forChild(PatientCardsPage),
  ],
})
export class PatientCardsPageModule {}
