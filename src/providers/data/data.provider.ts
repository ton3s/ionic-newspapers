import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {INewspaper} from "./data.interface";

@Injectable()
export class DataProvider {

  newspapersUrl = "assets/data/newspapers.txt";
  newspapers: INewspaper[];

  constructor(public http: HttpClient) {
  }

  getNewspapers(): Promise<INewspaper[]> {
    return new Promise((resolve, reject) => {
      if (this.newspapers) resolve(this.newspapers);
      return this.http.get(this.newspapersUrl, {responseType: 'text'})
        .map(res => res.split('\n')
          .filter(line => line.split(";;").length === 6)
          .map((line, index) => {
            let arr = line.split(";;");
            return {
              id: index,
              region: arr[1],
              country: arr[2],
              name: arr[3],
              url: arr[4]
            };
          }))
        .toPromise()
        .then(resolve)
        .catch(reject);
    });
  }

  filterNewspapers(searchTerm): Promise<INewspaper[]> {
    return new Promise((resolve, reject) => {
      this.getNewspapers()
        .then(newspapers => {
          let filteredNewspapers = newspapers.filter((newspaper: INewspaper) => {
            return newspaper.region.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
              newspaper.country.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
              newspaper.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
          });
          resolve(filteredNewspapers);
        })
        .catch(reject);
    })
  }

  getRegions(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      this.getNewspapers()
        .then((newspapers: INewspaper[]) => {
          let regions = new Set();
          newspapers.forEach(newspaper => regions.add(newspaper.region));
          resolve(Array.from(regions));
        }).catch(reject);
    })
  }

  getCountriesForRegion(region: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
      this.getNewspapers()
        .then((newspapers: INewspaper[]) => {
          let countries = new Set();
          newspapers
            .filter(newspaper => newspaper.region === region)
            .forEach(newspaper => countries.add(newspaper.country));
          resolve(Array.from(countries));
        }).catch(reject);
    })
  }

  filterNewspapersForCountry(region: string, country: string, searchTerm: string): Promise<INewspaper[]> {
    return new Promise((resolve, reject) => {
      this.getNewspapers()
        .then(newspapers => {
          let filteredNewspapers = newspapers.filter((newspaper: INewspaper) => {
            return newspaper.region === region && newspaper.country === country;
          }).filter((newspaper: INewspaper) => {
            return newspaper.region.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
              newspaper.country.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
              newspaper.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
          });
          resolve(filteredNewspapers);
        })
        .catch(reject);
    })
  }

}
