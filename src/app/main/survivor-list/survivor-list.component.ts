import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Survivor } from './../../core/types/survivor.types';
import { SurvivorsService } from './../../core/services/survivors.service';

@Component({
  selector: 'app-survivor-list',
  templateUrl: './survivor-list.component.html',
  styleUrls: ['./survivor-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class SurvivorListComponent implements OnInit {

  survivorList: Survivor[] = [];
  filteredSurvivors: Survivor[] = [];
  loading = false;
  page = 1;
  maxSize = window.innerWidth >= 768 ? 7 : 5;
  fakeCardList = [ {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {} ];

  constructor(private service: SurvivorsService) { }

  ngOnInit(): void {
    this.getSurvivors();
  }

  getSurvivors(): void {
    this.loading = true;

    this.service.get().subscribe((data: Survivor[]) => {
      this.survivorList = data;
      this.filteredSurvivors = data;
      this.loading = false;
    });
  }

  onLoaderOutput(): void {
    this.loading = true;
  }

  onFilter(filter): void {
    this.page = 1;

    this.filteredSurvivors = this.survivorList.filter(survivor => {
      return (
        survivor.name.toLowerCase().includes(filter.name.trim().toLowerCase()) &&
        survivor.id.toLowerCase().includes(filter.id.trim().toLowerCase())
      );
    });

    this.loading = false;
  }

}
