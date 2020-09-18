import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ApiItem, Survivor } from '../../types/survivor.types';
import { environment } from '../../../../environments/environment';
import { SurvivorPayload, Inventory } from 'src/app/core/types/survivor.types';
import { LonLatFormatter } from '../../utils/lonlat-formatter';

@Injectable({
  providedIn: 'root'
})

export class SurvivorsService {

  constructor(private http: HttpClient) { }

  /**
   * Get a list of survivors
   */
  get(): Observable<Survivor[]> {
    return this.http.get(`${environment.apiUrl}/people.json`).pipe(map((data: Survivor[]) => {
      const survivorList = data;

      survivorList.forEach(survivor => {
        const name = survivor.name.split(' ');

        const firstLetter = name[0].charAt(0);
        const secondLetter = name.length > 1 ? name.slice(-1)[0].charAt(0) : '';

        /** Create fake image with survivor initial name letters */
        survivor.initialLetters = `${firstLetter}${secondLetter}`;
        survivor.id = survivor.location.split('people/')[1];
      });

      return survivorList;
    }));
  }

  /**
   * Get survivor data by his id
   * @param id survivor id
   */
  getById(id: string): Observable<Survivor> {
    return this.http.get(`${environment.apiUrl}/people/${id}.json`).pipe(map((data: Survivor) => {
      const survivor = data;

      survivor.lonlat = LonLatFormatter.parseFromPointFormat(survivor.lonlat);

      return survivor;
    }));
  }

  /**
   * Get survivor inventory
   * @param id survivor id
   */
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

  /**
   * Create a new survivor
   * @param payload new survivor data
   */
  createNewSurvivor(payload: SurvivorPayload) {
    return this.http.post(`${environment.apiUrl}/people.json`, payload);
  }

  /**
   * Edit a survivor
   * @param id survivor id
   * @param payload edited survivor data
   */
  editSurvivor(id: string, payload: SurvivorPayload) {
    return this.http.patch(`${environment.apiUrl}/people/${id}.json`, payload);
  }

  /**
   * Make a trade between 2 survivors
   * @param id id from the survivor sending a trade
   * @param payload data from the survivor whose trade is being sended
   */
  trade(id: string, payload: string) {
    return this.http.post(`${environment.apiUrl}/people/${id}/properties/trade_item.json`, payload, {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-type': 'application/json; charset=UTF-8'
      })
    });
  }

  /**
   * Flag a survivor as infected
   * @param reporterId id from the survivor that is reporting
   * @param infectedPersonId id from the survivor that is being flagged as infected
   */
  flagAsInfected(reporterId: string, infectedPersonId) {
    return this.http.post(`${environment.apiUrl}/people/${reporterId}/report_infection.json`, {
      infected: infectedPersonId
    });
  }

  /**
   * A list of requests that shows global reports
   */
  getGlobalReports() {
    return forkJoin([
      this.getAverageOfInfected(),
      this.getAverageHealthyPeople(),
      this.getTotalPointsLost(),
      this.getAverageItemsPerPerson()
    ]);
  }

  /**
   * Get the average of infected people
   */
  getAverageOfInfected() {
    return this.http.get(`${environment.apiUrl}/report/infected.json`).pipe(map((data: any) => {
      return data.report.average_infected.toFixed(1);
    }));
  }

  /**
   * Get the average of healthy people
   */
  getAverageHealthyPeople() {
    return this.http.get(`${environment.apiUrl}/report/non_infected.json`).pipe(map((data: any) => {
      return data.report.average_healthy.toFixed(1);
    }));
  }

  /**
   * Get the total amount of points lost by infected people
   */
  getTotalPointsLost() {
    return this.http.get(`${environment.apiUrl}/report/infected_points.json`).pipe(map((data: any) => {
      return data.report.total_points_lost.toFixed(1);
    }));
  }

  /**
   * Get the average amount of items of each category
   */
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
