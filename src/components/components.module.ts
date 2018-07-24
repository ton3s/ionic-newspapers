import {NgModule} from '@angular/core';
import {NewspaperCardComponent} from './newspaper-card/newspaper-card';
import {IonicModule} from "ionic-angular";

@NgModule({
  declarations: [NewspaperCardComponent],
  imports: [IonicModule],
  exports: [NewspaperCardComponent]
})
export class ComponentsModule {
}
