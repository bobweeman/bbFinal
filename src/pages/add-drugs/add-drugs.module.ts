import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddDrugsPage } from './add-drugs';

@NgModule({
  declarations: [
    AddDrugsPage,
  ],
  imports: [
    IonicPageModule.forChild(AddDrugsPage),
  ],
})
export class AddDrugsPageModule {}
