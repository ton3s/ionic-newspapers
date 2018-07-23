import { Component } from '@angular/core';
import {ActionSheetController, NavController} from 'ionic-angular';
import {DataProvider} from "../../providers/data/data.provider";
import {INewspaper} from "../../providers/data/data.interface";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  newspapers: INewspaper[];

  constructor(public navCtrl: NavController,
              public actionSheetCtrl: ActionSheetController,
              public dataProvider: DataProvider) {
  }

  ionViewDidLoad() {
  }

  addNewspaper() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Add Newspaper',
      buttons: [
        {
          text: 'Browse',
          handler: () => {
            console.log('Browse clicked');
          }
        },{
          text: 'Search',
          handler: () => {
            this.search();
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  browse() {

  }

  search() {
    this.navCtrl.push('SearchPage' );
  }

  loadNewspapers() {
    this.dataProvider.getNewspapers().then(newspapers => this.newspapers = newspapers);
  }

}
