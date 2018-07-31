import {async, ComponentFixture, TestBed, fakeAsync, tick} from '@angular/core/testing';
import {DebugElement} from '@angular/core';
import {BrowseCountryPage} from './browse-country';
import {IonicModule, NavController, NavParams} from 'ionic-angular';
import {NavControllerMock, NavParamsMock} from 'ionic-mocks';
import {DataProvider} from "../../../providers/data/data.provider";

describe('Browse Country Page', () => {

  let rootElement: DebugElement;
  let comp: BrowseCountryPage;
  let fixture: ComponentFixture<BrowseCountryPage>;
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
    getCountriesForRegion: (region) => new Promise(resolve => resolve(["California", "Texas"]))
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BrowseCountryPage],
      imports: [
        IonicModule.forRoot(BrowseCountryPage)
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
    fixture = TestBed.createComponent(BrowseCountryPage);
    comp = fixture.componentInstance;
    fixture.detectChanges();
    rootElement = fixture.debugElement;
  });

  it('should create BrowsePage component', () => {
    expect(comp instanceof BrowseCountryPage).toBe(true);
  });

  it('should have a countries class member that is an array', () => {
    expect(comp.countries instanceof Array).toBe(true);
  });

  it('should populate region from NavParams when ionViewDidLoad() is called', () => {
    comp.ionViewDidLoad();
    expect(navParams.get).toHaveBeenCalledWith("region");
  });

  it('should populate countries array when ionViewDidLoad() is called', fakeAsync(() => {
    comp.ionViewDidLoad();
    tick();
    expect(comp.countries.length).toEqual(2);
  }));

  it('should push the browse country page to the navigation stack when onCountry() is called', () => {
    comp.region = "United States";
    comp.onCountry("Texas");
    expect(navController.push).toHaveBeenCalledWith('BrowseNewspapersPage', {region: "United States", country: 'Texas'});
  });

  it('should set and pop back to Root page when backToHomePage() is called', fakeAsync(() => {
    comp.backToHomePage();
    expect(navController.setRoot).toHaveBeenCalled();
    tick();
    expect(navController.popToRoot).toHaveBeenCalled();
  }));

});
