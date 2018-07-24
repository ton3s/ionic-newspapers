import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TabsPage} from "../../tabs/tabs";
import {DataProvider} from "../../../providers/data/data.provider";

@IonicPage()
@Component({
  selector: 'page-browse-country',
  templateUrl: 'browse-country.html',
})
export class BrowseCountryPage {

  region: string;
  countries: string[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public dataProvider: DataProvider) {

    this.region = this.navParams.get('region');
  }

  ionViewDidLoad() {
    if (!this.navCtrl.canGoBack()) this.backToHomePage();
    this.dataProvider.getCountriesForRegion(this.region).then(countries => this.countries = countries);
  }

  onCountry(country) {
    this.navCtrl.push('BrowseNewspapersPage', {country});
  }

  backToHomePage() {
    this.navCtrl.setRoot(TabsPage).then(() => this.navCtrl.popToRoot());
  }

}
