import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {DataProvider} from "../../providers/data/data.provider";
import {TabsPage} from "../tabs/tabs";

@IonicPage()
@Component({
  selector: 'page-browse',
  templateUrl: 'browse.html',
})
export class BrowsePage {

  regions: string[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public dataProvider: DataProvider) {
  }

  ionViewDidLoad() {
    if (!this.navCtrl.canGoBack()) this.backToHomePage();
    this.dataProvider.getRegions().then(regions => this.regions = regions);
  }

  onRegion(region) {
    this.navCtrl.push('BrowseCountryPage', {region});
  }

  backToHomePage() {
    this.navCtrl.setRoot(TabsPage).then(() => this.navCtrl.popToRoot());
  }

}
