import { Injectable } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { Survivor } from 'src/app/core/types/survivor.types';

@Injectable({
  providedIn: 'root'
})

export class AlertService {

  /**
   * NGX-TOASTR LIB DOC: https://www.npmjs.com/package/ngx-toastr
   */

   reportModal = {
     show: false,
     infectedSurvivor: null
   };

  constructor(
    private toast: ToastrService
  ) { }

  showSuccess(title: string, message?: string) {
    this.toast.success(message, title, {
      progressBar: true,
      extendedTimeOut: 2000,
      timeOut: 10000,
      enableHtml: true
    });
  }

  showError(title: string, message?: string) {
    this.toast.error(message, title, {
      progressBar: true,
      extendedTimeOut: 2000,
      timeOut: 10000,
      enableHtml: true
    });
  }

  openReportModal(infectedSurvivor: Survivor) {
    this.reportModal.show = true;
    this.reportModal.infectedSurvivor = infectedSurvivor;
  }

  closeReportModal() {
    this.reportModal.show = false;
  }

}
