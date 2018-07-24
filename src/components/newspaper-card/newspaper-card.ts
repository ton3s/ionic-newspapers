import {Component, EventEmitter, Input, Output} from '@angular/core';
import {INewspaper} from "../../providers/data/data.interface";

@Component({
  selector: 'newspaper-card',
  templateUrl: 'newspaper-card.html'
})
export class NewspaperCardComponent {

  @Input('newspaper')
  newspaper: INewspaper;

  @Input('isFavorite')
  isFavorite: boolean = false;

  @Output('onClick')
  onClick: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }
}
