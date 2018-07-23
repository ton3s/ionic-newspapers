import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {INewspaper} from "./data.interface";

@Injectable()
export class DataProvider {

  newspapersUrl = "assets/data/newspapers.txt";

  constructor(public http: HttpClient) {
  }

  getNewspapers(): Promise<INewspaper[]> {
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
      .toPromise();
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
}
