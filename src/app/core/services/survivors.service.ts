import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../../environments/environment';
import { Survivor } from '../types/survivor.types';

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

}
