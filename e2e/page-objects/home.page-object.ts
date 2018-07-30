import { browser, element, by, ElementFinder } from 'protractor';

export class HomePageObject {

  browseToPage(){
    browser.get('');
  }

  getTitle() {
    return element(by.css('ion-title .toolbar-title')).getText();
  }

}
