import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PatientMapPage } from './patient-map';

@NgModule({
  declarations: [
    PatientMapPage,
  ],
  imports: [
    IonicPageModule.forChild(PatientMapPage),
  ],
})
export class PatientMapPageModule {}
