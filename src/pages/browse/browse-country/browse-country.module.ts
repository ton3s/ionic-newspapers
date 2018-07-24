import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BrowseCountryPage } from './browse-country';

@NgModule({
  declarations: [
    BrowseCountryPage,
  ],
  imports: [
    IonicPageModule.forChild(BrowseCountryPage),
  ],
})
export class BrowseCountryPageModule {}
