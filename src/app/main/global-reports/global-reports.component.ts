import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { SurvivorsService } from './../../core/services/survivors/survivors.service';

@Component({
  selector: 'app-global-reports',
  templateUrl: './global-reports.component.html',
  styleUrls: ['./global-reports.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class GlobalReportsComponent implements OnInit {

  loading = false;
  averageInfected: number;
  averageHealthy: number;
  totalPointsLost: number;
  averageItems = {
    ak47: 0,
    fijiWater: 0,
    campbellSoup: 0,
    firstAid: 0,
    averageItemsPerPerson: 0,
    averageItemsPerHealthyPerson: 0
  };

  constructor(private service: SurvivorsService) { }

  ngOnInit(): void {
    this.getReports();
  }

  /**
   * Get a list of reports about the survivors data
   */
  getReports() {
    this.loading = true;

    this.service.getGlobalReports().subscribe(data => {
      this.averageInfected = data[0];
      this.averageHealthy = data[1];
      this.totalPointsLost = data[2];
      this.averageItems = data[3];

      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

}
