import {ComponentFixture, TestBed} from '@angular/core/testing';
import {DebugElement} from '@angular/core';
import {AboutPage} from './about';
import {IonicModule, NavController, NavParams} from 'ionic-angular';
import {UtilityProvider} from "../../providers/utility/utility.provider";
import {NavControllerMock, NavParamsMock} from 'ionic-mocks';

describe('About Page', () => {

  let rootElement: DebugElement;
  let comp: AboutPage;
  let fixture: ComponentFixture<AboutPage>;
  let utilityProvider: UtilityProvider;
  let navController: NavController;

  const utilityProviderStub = {
    openBrowser: (url) => url
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AboutPage],
      imports: [
        IonicModule.forRoot(AboutPage)
      ],
      providers: [
        {provide: NavController, useFactory: () => NavControllerMock.instance()},
        {provide: NavParams, useFactory: () => NavParamsMock.instance()},
        {provide: UtilityProvider, useValue: utilityProviderStub}
      ]
    });
    utilityProvider = TestBed.get(UtilityProvider);
    navController = TestBed.get(NavController);
    utilityProvider = TestBed.get(UtilityProvider);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutPage);
    comp = fixture.componentInstance;
    fixture.detectChanges();
    rootElement = fixture.debugElement;
  });

  it('should create AboutPage component', () => {
    expect(comp instanceof AboutPage).toBe(true);
  });

  it('should call openBrowser() correctly', () => {
    spyOn(utilityProvider, 'openBrowser');
    let url = "https://antoniocunanan.com";
    comp.openBrowser(url);
    expect(utilityProvider.openBrowser).toHaveBeenCalledWith(url);
  });

});
