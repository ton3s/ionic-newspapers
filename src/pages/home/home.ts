import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {DataProvider} from "../../providers/data/data.provider";
import {INewspaper} from "../../providers/data/data.interface";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  newspapers: INewspaper[];

  constructor(public navCtrl: NavController,
              public dataProvider: DataProvider) {
  }

  ionViewDidLoad() {
    this.dataProvider.getNewspapers()
      .then(newspapers => {
        console.log(newspapers);
        this.newspapers = newspapers
      });
  }

}
