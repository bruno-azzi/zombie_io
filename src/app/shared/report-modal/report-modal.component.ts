import { FormControl } from '@angular/forms';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

import { Survivor } from 'src/app/core/types/survivor.types';
import { AlertService } from './../../core/services/alert/alert.service';
import { SurvivorsService } from './../../core/services/survivors/survivors.service';

@Component({
  selector: 'app-report-modal',
  templateUrl: './report-modal.component.html',
  styleUrls: ['./report-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ReportModalComponent implements OnInit {

  @Input() infectedSurvivor: Survivor;

  currentSurvivor = new FormControl('');
  loading = false;
  survivors: Survivor[] = [];

  constructor(
    private alert: AlertService,
    private service: SurvivorsService
  ) { }

  ngOnInit(): void {
    console.log('this.infectedSurvivor',this.infectedSurvivor)
    this.getSurvivors();
  }

  getSurvivors() {
    this.loading = true;

    this.service.get().subscribe((data: Survivor[]) => {
      this.survivors = data.filter(survivor => survivor.id !== this.infectedSurvivor.id);
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  confirm() {
    this.loading = true;

    this.service.flagAsInfected(this.currentSurvivor.value.id, this.infectedSurvivor.id).subscribe(data => {
      console.log(data);
      this.alert.showSuccess('Success', `${this.infectedSurvivor.name} was successfully flagged as infected`);
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  closeModal() {
    this.alert.closeReportModal();
  }

}
