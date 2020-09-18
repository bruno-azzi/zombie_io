import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Survivor } from './../../core/types/survivor.types';
import { AlertService } from './../../core/services/alert/alert.service';
import { SurvivorsService } from '../../core/services/survivors/survivors.service';

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
  itemsPerPage = window.innerWidth >= 768 ? 24 : 12;

  constructor(
    private alert: AlertService,
    private service: SurvivorsService
  ) { }

  ngOnInit(): void {
    this.getSurvivors();
  }

  /**
   * Get a list of survivors
   */
  getSurvivors(): void {
    this.loading = true;

    this.service.get().subscribe((data: Survivor[]) => {
      this.survivorList = data;
      this.filteredSurvivors = data;
      this.loading = false;
    });
  }

  /**
   * Loader output after users filter by survivor name
   */
  onLoaderOutput(): void {
    this.loading = true;
  }

  /**
   * On filter by survivor name or uuid
   * @param filter filter value
   */
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

  /**
   * Flag survivor as infected
   * @param event click event
   * @param infectedSurvivor infected survivor data
   */
  flagAsInfected(event, infectedSurvivor: Survivor) {
    const el = event.target.parentElement.parentElement;
    el.blur();

    this.alert.openReportModal(infectedSurvivor);
  }

}
