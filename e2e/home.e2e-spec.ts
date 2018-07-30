import {browser} from 'protractor';
import {HomePageObject} from './page-objects/home.page-object';

describe('Home', () => {

  let homePage: HomePageObject;

  beforeEach(() => {
    homePage = new HomePageObject();
    homePage.browseToPage();
  });

  it('should have a title of "Newspapers"', () => {
      homePage.getTitle().then(title => {
        expect(title).toBe('Newspapers');
      });
  });

});
