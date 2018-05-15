import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StockDrugsPage } from './stock-drugs';

@NgModule({
  declarations: [
    StockDrugsPage,
  ],
  imports: [
    IonicPageModule.forChild(StockDrugsPage),
  ],
})
export class StockDrugsPageModule {}
