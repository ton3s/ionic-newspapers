import {Component} from '@angular/core';
import {ActionSheetController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {INewspaper} from "../../providers/data/data.interface";
import {DataProvider} from "../../providers/data/data.provider";
import {UtilityProvider} from "../../providers/utility/utility.provider";
import {FavoritesProvider} from "../../providers/favorites/favorites.provider";
import {TabsPage} from "../tabs/tabs";

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
              public actionSheetCtrl: ActionSheetController,
              public dataProvider: DataProvider,
              public utilityProvider: UtilityProvider,
              public favoritesProvider: FavoritesProvider) {
  }

  ionViewDidLoad() {
    if (!this.navCtrl.canGoBack()) this.backToHomePage();
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
            this.favoritesProvider.saveFavorite(newspaper)
              .then(_ => this.utilityProvider.presentToast("Saved Newspaper"))
          }
        }, {
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

  backToHomePage() {
    this.navCtrl.setRoot(TabsPage).then(() => this.navCtrl.popToRoot());
  }

}
