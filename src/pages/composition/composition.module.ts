import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompositionPage } from './composition';

@NgModule({
  declarations: [
    CompositionPage,
  ],
  imports: [
    IonicPageModule.forChild(CompositionPage),
  ],
})
export class CompositionPageModule {}
