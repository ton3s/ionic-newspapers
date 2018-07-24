import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {BrowseNewspapersPage} from './browse-newspapers';
import {ComponentsModule} from "../../../components/components.module";

@NgModule({
  declarations: [
    BrowseNewspapersPage,
  ],
  imports: [
    IonicPageModule.forChild(BrowseNewspapersPage),
    ComponentsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BrowseNewspapersPageModule {
}
