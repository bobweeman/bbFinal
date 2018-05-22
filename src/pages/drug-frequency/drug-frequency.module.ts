import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DrugFrequencyPage } from './drug-frequency';

@NgModule({
  declarations: [
    DrugFrequencyPage,
  ],
  imports: [
    IonicPageModule.forChild(DrugFrequencyPage),
  ],
})
export class DrugFrequencyPageModule {}
