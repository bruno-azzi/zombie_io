import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ApiItem, Survivor } from '../../types/survivor.types';
import { environment } from '../../../../environments/environment';
import { SurvivorPayload, Inventory } from 'src/app/core/types/survivor.types';
import { LonLatFormatter } from '../../utils/lonlat-formatter';

@Injectable({
  providedIn: 'root'
})

export class SurvivorsService {

  constructor(private http: HttpClient) { }

  get(): Observable<Survivor[]> {
    return this.http.get(`${environment.apiUrl}/people.json`).pipe(map((data: Survivor[]) => {
      const survivorList = data;

      survivorList.forEach(survivor => {
        const name = survivor.name.split(' ');

        const firstLetter = name[0].charAt(0);
        const secondLetter = name.length > 1 ? name.slice(-1)[0].charAt(0) : '';

        survivor.initialLetters = `${firstLetter}${secondLetter}`;
        survivor.id = survivor.location.split('people/')[1];
      });

      return survivorList;
    }));
  }

  getById(id: string): Observable<Survivor> {
    return this.http.get(`${environment.apiUrl}/people/${id}.json`).pipe(map((data: Survivor) => {
      const survivor = data;

      survivor.lonlat = LonLatFormatter.parseFromPointFormat(survivor.lonlat);

      return survivor;
    }));
  }

  getSurvivorInventory(id: string) {
    return this.http.get(`${environment.apiUrl}/people/${id}/properties.json`).pipe(map((data: ApiItem[]) => {
      const inventory: Inventory = {};

      data.forEach(apiItem => {
        switch (apiItem.item.name) {
          case 'Fiji Water':
            inventory.fijiWater = apiItem.quantity;
            break;

          case 'Campbell Soup':
            inventory.campbellSoup = apiItem.quantity;
            break;

          case 'First Aid Pouch':
            inventory.firstAid = apiItem.quantity;
            break;

          default:
            inventory.ak47 = apiItem.quantity;
            break;
        }
      });

      return inventory;
    }));
  }

  createNewSurvivor(payload: SurvivorPayload) {
    return this.http.post(`${environment.apiUrl}/people.json`, payload);
  }

  editSurvivor(id: string, payload: SurvivorPayload) {
    return this.http.patch(`${environment.apiUrl}/people/${id}.json`, payload);
  }

  trade(id, payload) {
    return this.http.post(`${environment.apiUrl}/people/${id}/properties/trade_item.json`, {
      name: 'teste',
      payment: 'Fiji water:1',
      pick: 'Fiji water:1'
    });
  }

}
