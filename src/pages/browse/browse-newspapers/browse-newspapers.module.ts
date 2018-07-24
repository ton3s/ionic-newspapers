import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BrowseNewspapersPage } from './browse-newspapers';

@NgModule({
  declarations: [
    BrowseNewspapersPage,
  ],
  imports: [
    IonicPageModule.forChild(BrowseNewspapersPage),
  ],
})
export class BrowseNewspapersPageModule {}
