import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {INewspaper} from "../data/data.interface";
import {Storage} from '@ionic/storage';

@Injectable()
export class FavoritesProvider {

  public favorites: INewspaper[] = [];

  constructor(public http: HttpClient,
              public storage: Storage) {
  }

  getFavorites(): Promise<INewspaper[]> {
    return new Promise((resolve, reject) => {
      if (this.favorites.length > 0) {
        resolve(this.favorites)
      }
      else {
        this.storage.get('newspapers').then(favorites => {
          this.favorites = [];
          if (favorites) {
            this.favorites = favorites;
          }
          resolve(this.favorites);
        }).catch(reject);
      }
    });
  }

  saveFavorite(newspaper: INewspaper) {
    return new Promise((resolve, reject) => {
      // Check if it already exists in the users favorites
      if (!this.favorites.find(favorite => favorite.id === newspaper.id)) {
        this.favorites.push(newspaper);
        this.storage.set('newspapers', this.favorites).then(resolve).catch(reject);
      }
      resolve();
    })
  }

  removeFavorite(quote: INewspaper) {
    return new Promise((resolve, reject) => {
      let index = this.favorites.map(favorite => favorite.id).indexOf(quote.id);
      if (index > -1) {
        this.favorites.splice(index, 1);
        this.storage.set('newspapers', this.favorites).then(resolve).catch(reject);
      }
      resolve();
    });
  }

  isFavorite(newspaper: INewspaper): boolean {
    return this.favorites.map(favorite => favorite.id).indexOf(newspaper.id) > -1;
  }
}
