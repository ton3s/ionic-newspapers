import { Component } from '@angular/core';
import {ActionSheetController, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {INewspaper} from "../../providers/data/data.interface";
import {DataProvider} from "../../providers/data/data.provider";
import {UtilityProvider} from "../../providers/utility/utility.provider";

const SEARCH_MESSAGE = 'Please enter a search string of at least 4 characters';
const SEARCH_NO_RESULTS = 'No Results Found';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {


  searchTerm: string = '';
  searchMessage: string = SEARCH_MESSAGE;
  newspapers: INewspaper[] = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastCtrl: ToastController,
              public actionSheetCtrl: ActionSheetController,
              public dataProvider: DataProvider,
              public utilityProvider: UtilityProvider) {
  }

  ionViewDidLoad() {
    setTimeout(() => this.setFilteredItems(), 350);
  }

  setFilteredItems() {
    if (this.searchTerm.length < 4) {
      this.searchMessage = SEARCH_MESSAGE;
      this.newspapers = [];
      return;
    }
    this.dataProvider.filterNewspapers(this.searchTerm)
      .then((newspapers: INewspaper[]) => {
        this.newspapers = newspapers;
        if (this.newspapers.length === 0) this.searchMessage = SEARCH_NO_RESULTS;
      });
  }

  presentToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 1500,
      position: 'middle',
      cssClass: 'toast-content'
    });
    toast.present();
  }

  onNewspaperClick(newspaper: INewspaper) {
    const actionSheet = this.actionSheetCtrl.create({
      title: newspaper.name,
      buttons: [
        {
          text: 'View',
          handler: () => {
            console.log('View clicked');
          }
        },
        {
          text: 'Save',
          handler: () => {
            console.log('Save clicked');
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

}
