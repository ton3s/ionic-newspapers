import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BrowsePage } from './browse';

@NgModule({
  declarations: [
    BrowsePage,
  ],
  imports: [
    IonicPageModule.forChild(BrowsePage),
  ],
})
export class BrowsePageModule {}
