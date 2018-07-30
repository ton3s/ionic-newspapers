import {async, ComponentFixture, TestBed, fakeAsync, tick} from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA, DebugElement} from '@angular/core';
import {SearchPage} from './search';
import {IonicModule, NavController, DeepLinker, ActionSheetController, NavParams} from 'ionic-angular';
import {DeepLinkerMock} from '../../../test-config/mocks-ionic';
import {FavoritesProvider} from "../../providers/favorites/favorites.provider";
import {UtilityProvider} from "../../providers/utility/utility.provider";
import {INewspaper} from "../../providers/data/data.interface";
import {ActionSheetControllerMock, NavControllerMock, NavParamsMock} from 'ionic-mocks';
import {DataProvider} from "../../providers/data/data.provider";

describe('Search Page', () => {

  let rootElement: DebugElement;
  let comp: SearchPage;
  let fixture: ComponentFixture<SearchPage>;
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
    }
  };

  const dataProviderStub = {
    filterNewspapers: (searchTerm) => {
      return new Promise(resolve => resolve([{
        id: 1,
        region: 'North America & The Caribbean',
        country: 'North Carolina',
        name: 'Dallas News',
        url: 'http://www.topix.net/city/dallas-nc'
      }]))
    }
  };

  const utilityProviderStub = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchPage],
      imports: [
        IonicModule.forRoot(SearchPage)
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {provide: DeepLinker, useClass: DeepLinkerMock},
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
    fixture = TestBed.createComponent(SearchPage);
    comp = fixture.componentInstance;
    fixture.detectChanges();
    rootElement = fixture.debugElement;
  });

  it('should create Search component', () => {
    expect(comp instanceof SearchPage).toBe(true);
  });

  it('should have a newspapers class member that is an array', () => {
    expect(comp.newspapers instanceof Array).toBe(true);
  });

  it('should populate newspapers array when setFilteredItems() is called', fakeAsync(() => {
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
