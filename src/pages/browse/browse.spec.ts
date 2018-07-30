import {async, ComponentFixture, TestBed, fakeAsync, tick} from '@angular/core/testing';
import {DebugElement} from '@angular/core';
import {BrowsePage} from './browse';
import {IonicModule, NavController, NavParams} from 'ionic-angular';
import {NavControllerMock, NavParamsMock} from 'ionic-mocks';
import {DataProvider} from "../../providers/data/data.provider";

describe('Browse Page', () => {

  let rootElement: DebugElement;
  let comp: BrowsePage;
  let fixture: ComponentFixture<BrowsePage>;
  let dataProvider: DataProvider;
  let navController: NavController;
  let navParams: NavParams;

  const dataProviderStub = {
    filterNewspapers: (searchTerm) => {
      return new Promise(resolve => resolve([{
        id: 1,
        region: 'North America & The Caribbean',
        country: 'North Carolina',
        name: 'Dallas News',
        url: 'http://www.topix.net/city/dallas-nc'
      }]))
    },
    getRegions: () => new Promise(resolve => resolve(["United States", "Asia"]))
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BrowsePage],
      imports: [
        IonicModule.forRoot(BrowsePage)
      ],
      providers: [
        {provide: NavController, useFactory: () => NavControllerMock.instance()},
        {provide: NavParams, useFactory: () => NavParamsMock.instance()},
        {provide: DataProvider, useValue: dataProviderStub},
      ]
    });
    navController = TestBed.get(NavController);
    navParams = TestBed.get(NavParams);
    dataProvider = TestBed.get(DataProvider);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowsePage);
    comp = fixture.componentInstance;
    fixture.detectChanges();
    rootElement = fixture.debugElement;
  });

  it('should create BrowsePage component', () => {
    expect(comp instanceof BrowsePage).toBe(true);
  });

  it('should have a regions class member that is an array', () => {
    expect(comp.regions instanceof Array).toBe(true);
  });

  it('should populate regions array when ionViewDidLoad() is called', fakeAsync(() => {
    comp.ionViewDidLoad();
    tick();
    expect(comp.regions.length).toEqual(2);
  }));

  it('should push the browse country page to the navigation stack when onRegion() is called', () => {
    comp.onRegion("United States");
    expect(navController.push).toHaveBeenCalledWith('BrowseCountryPage', {region: "United States"});
  });

  it('should set and pop back to Root page when backToHomePage() is called', fakeAsync(() => {
    comp.backToHomePage();
    expect(navController.setRoot).toHaveBeenCalled();
    tick();
    expect(navController.popToRoot).toHaveBeenCalled();
  }));

});
