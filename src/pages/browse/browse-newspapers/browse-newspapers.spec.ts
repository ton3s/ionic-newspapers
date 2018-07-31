import {async, ComponentFixture, TestBed, fakeAsync, tick} from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA, DebugElement} from '@angular/core';
import {BrowseNewspapersPage} from './browse-newspapers';
import {IonicModule, NavController, DeepLinker, ActionSheetController, NavParams} from 'ionic-angular';
import {FavoritesProvider} from "../../../providers/favorites/favorites.provider";
import {UtilityProvider} from "../../../providers/utility/utility.provider";
import {INewspaper} from "../../../providers/data/data.interface";
import {ActionSheetControllerMock, NavControllerMock, NavParamsMock} from 'ionic-mocks';
import {DataProvider} from "../../../providers/data/data.provider";

describe('Browse Newspapers Page', () => {

  let rootElement: DebugElement;
  let comp: BrowseNewspapersPage;
  let fixture: ComponentFixture<BrowseNewspapersPage>;
  let dataProvider: DataProvider;
  let favoritesProvider: FavoritesProvider;
  let utilityProvider: UtilityProvider;
  let navController: NavController;
  let actionSheetController: ActionSheetController;
  let navParams: NavParams;

  const favoritesProviderStub = {
    getFavorites: () => {
      return new Promise(resolve => resolve([{
        id: 1,
        region: 'North America & The Caribbean',
        country: 'North Carolina',
        name: 'Dallas News',
        url: 'http://www.topix.net/city/dallas-nc'
      }]))
    },
    saveFavorite: (newspaper) => new Promise(resolve => resolve())
  };

  const dataProviderStub = {
    filterNewspapersForCountry: (region, country, searchTerm) => {
      return new Promise(resolve => resolve([{
        id: 1,
        region: 'North America & The Caribbean',
        country: 'North Carolina',
        name: 'Dallas News',
        url: 'http://www.topix.net/city/dallas-nc'
      }]))
    },
    getCountriesForRegion: (region) => new Promise(resolve => resolve(["California", "Texas"]))
  };

  const utilityProviderStub = {
    presentToast: (message) => message,
    openBrowser: (url) => url,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BrowseNewspapersPage],
      imports: [
        IonicModule.forRoot(BrowseNewspapersPage)
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {provide: NavController, useFactory: () => NavControllerMock.instance()},
        {provide: NavParams, useFactory: () => NavParamsMock.instance()},
        {provide: ActionSheetController, useFactory: () => ActionSheetControllerMock.instance()},
        {provide: FavoritesProvider, useValue: favoritesProviderStub},
        {provide: DataProvider, useValue: dataProviderStub},
        {provide: UtilityProvider, useValue: utilityProviderStub}
      ]
    });
    favoritesProvider = TestBed.get(FavoritesProvider);
    dataProvider = TestBed.get(DataProvider);
    utilityProvider = TestBed.get(UtilityProvider);
    navController = TestBed.get(NavController);
    actionSheetController = TestBed.get(ActionSheetController);
    navParams = TestBed.get(NavParams);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseNewspapersPage);
    comp = fixture.componentInstance;
    fixture.detectChanges();
    rootElement = fixture.debugElement;
  });

  it('should create Browse Newspapers component', () => {
    expect(comp instanceof BrowseNewspapersPage).toBe(true);
  });

  it('should have a newspapers class member that is an array', () => {
    expect(comp.newspapers instanceof Array).toBe(true);
  });

  it('should populate region and country from NavParams when ionViewDidLoad() is called', () => {
    comp.ionViewDidLoad();
    expect(navParams.get).toHaveBeenCalledWith("region");
    expect(navParams.get).toHaveBeenCalledWith("country");
  });

  it('should populate newspapers array when setFilteredItems() is called', fakeAsync(() => {
    comp.region = "United States";
    comp.country = "Texas";
    comp.searchTerm = "Texas";
    comp.setFilteredItems();
    tick();
    expect(comp.newspapers.length).toEqual(1);
  }));

  it('should create and present an action sheet when onNewspaperClick() is called', () => {
    let newspaper: INewspaper = {
      id: 1,
      region: 'North America & The Caribbean',
      country: 'North Carolina',
      name: 'Dallas News',
      url: 'http://www.topix.net/city/dallas-nc'
    };
    comp.onNewspaperClick(newspaper);
    expect(actionSheetController.create).toHaveBeenCalled();
    let actionSheet = actionSheetController.create();
    expect(actionSheet.present).toHaveBeenCalled();
  });

  it('should set and pop back to Root page when backToHomePage() is called', fakeAsync(() => {
    comp.backToHomePage();
    expect(navController.setRoot).toHaveBeenCalled();
    tick();
    expect(navController.popToRoot).toHaveBeenCalled();
  }));

});
