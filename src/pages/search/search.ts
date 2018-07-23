import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {INewspaper} from "../../providers/data/data.interface";
import {DataProvider} from "../../providers/data/data.provider";
import {UtilityProvider} from "../../providers/utility/utility.provider";

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  searchTerm: string = '';
  searchMessage: string = '';
  newspapers: INewspaper[] = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastCtrl: ToastController,
              public dataProvider: DataProvider,
              public utilityProvider: UtilityProvider) {
  }

  ionViewDidLoad() {
    setTimeout(() => this.setFilteredItems(), 350);
  }

  setFilteredItems() {
    if (this.searchTerm.length < 4) {
      this.searchMessage = 'Please enter a search string of at least 4 characters';
      this.newspapers = [];
      return;
    }
    this.dataProvider.filterNewspapers(this.searchTerm)
      .then((newspapers: INewspaper[]) => {
        this.newspapers = newspapers;
        if (this.newspapers.length === 0) this.searchMessage = 'No Results Found';
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

}
