import { Observable, forkJoin } from 'rxjs';
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

  flagAsInfected(reporterId: string, infectedPersonId) {
    return this.http.post(`${environment.apiUrl}/${reporterId}/report_infection.json`, {
      infected: infectedPersonId
    });
  }

  getGlobalReports() {
    return forkJoin([
      this.getAverageOfInfected(),
      this.getAverageHealthyPeople(),
      this.getTotalPointsLost(),
      this.getAverageItemsPerPerson()
    ]);
  }

  getAverageOfInfected() {
    return this.http.get(`${environment.apiUrl}/report/infected.json`).pipe(map((data: any) => {
      return data.report.average_infected.toFixed(1);
    }));
  }

  getAverageHealthyPeople() {
    return this.http.get(`${environment.apiUrl}/report/non_infected.json`).pipe(map((data: any) => {
      return data.report.average_healthy.toFixed(1);
    }));
  }

  getTotalPointsLost() {
    return this.http.get(`${environment.apiUrl}/report/infected_points.json`).pipe(map((data: any) => {
      return data.report.total_points_lost.toFixed(1);
    }));
  }

  getAverageItemsPerPerson() {
    return this.http.get(`${environment.apiUrl}/report/people_inventory.json`).pipe(map((data: any) => {
      const response = {
        averageItemsPerHealthyPerson: data.report.average_items_quantity_per_healthy_person.toFixed(1),
        averageItemsPerPerson: data.report.average_items_quantity_per_person.toFixed(1),
        ak47: +data.report.average_quantity_of_each_item_per_person['AK47'].toFixed(1),
        campbellSoup: +data.report.average_quantity_of_each_item_per_person['Campbell Soup'].toFixed(1),
        fijiWater: +data.report.average_quantity_of_each_item_per_person['Fiji Water'].toFixed(1),
        firstAid: +data.report.average_quantity_of_each_item_per_person['First Aid Pouch'].toFixed(1)
      };

      return response;
    }));
  }

}
