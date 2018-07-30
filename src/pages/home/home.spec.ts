import {async, ComponentFixture, TestBed, fakeAsync, tick} from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA, DebugElement} from '@angular/core';
import {HomePage} from './home';
import {IonicModule, NavController, DeepLinker, ActionSheetController} from 'ionic-angular';
import {NavMock, DeepLinkerMock} from '../../../test-config/mocks-ionic';
import {FavoritesProvider} from "../../providers/favorites/favorites.provider";
import {UtilityProvider} from "../../providers/utility/utility.provider";
import {INewspaper} from "../../providers/data/data.interface";
import {ActionSheetControllerMock, NavControllerMock} from 'ionic-mocks';

describe('Home Page', () => {

  let rootElement: DebugElement;
  let comp: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let favoritesProvider: FavoritesProvider;
  let utilityProvider: UtilityProvider;
  let navController: NavController;
  let actionSheetController: ActionSheetController;

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

  const utilityProviderStub = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [
        IonicModule.forRoot(HomePage)
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {provide: DeepLinker, useClass: DeepLinkerMock},
        {provide: NavController, useFactory: () => NavControllerMock.instance()},
        {provide: ActionSheetController, useFactory: () => ActionSheetControllerMock.instance()},
        {provide: FavoritesProvider, useValue: favoritesProviderStub},
        {provide: UtilityProvider, useValue: utilityProviderStub}
      ]
    });
    favoritesProvider = TestBed.get(FavoritesProvider);
    utilityProvider = TestBed.get(UtilityProvider);
    navController = TestBed.get(NavController);
    actionSheetController = TestBed.get(ActionSheetController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePage);
    comp = fixture.componentInstance;
    fixture.detectChanges();
    rootElement = fixture.debugElement;
  });

  it('should create HomePage component', () => {
    expect(comp instanceof HomePage).toBe(true);
  });

  it('should have a newspapers class member that is an array', () => {
    expect(comp.newspapers instanceof Array).toBe(true);
  });

  it('should populate newspapers array when loadFavorites() is called', fakeAsync(() => {
    comp.loadFavorites();
    tick();
    expect(comp.newspapers.length).toEqual(1);
  }));

  it('should push the browse page to the navigation stack when browse() is called', () => {
    comp.browse();
    expect(navController.push).toHaveBeenCalledWith('BrowsePage');
  });

  it('should push the search page to the navigation stack when search() is called', () => {
    comp.search();
    expect(navController.push).toHaveBeenCalledWith('SearchPage');
  });

  it('should create and present an action sheet when addNewspaper() is called', () => {
    comp.addNewspaper();
    expect(actionSheetController.create).toHaveBeenCalled();
    let actionSheet = actionSheetController.create();
    expect(actionSheet.present).toHaveBeenCalled();
  });

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

});
