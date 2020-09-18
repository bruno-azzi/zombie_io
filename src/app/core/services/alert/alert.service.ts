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

  /**
   * Show success message in a toast component
   * @param title message title
   * @param message message body
   */
  showSuccess(title: string, message?: string) {
    this.toast.success(message, title, {
      progressBar: true,
      extendedTimeOut: 2000,
      timeOut: 10000,
      enableHtml: true
    });
  }

  /**
   * Show error message in a toast component
   * @param title message title
   * @param message message body
   */
  showError(title: string, message?: string) {
    this.toast.error(message, title, {
      progressBar: true,
      extendedTimeOut: 2000,
      timeOut: 10000,
      enableHtml: true
    });
  }

  /**
   * Open modal to report survivor as infected
   * @param infectedSurvivor survivor data
   */
  openReportModal(infectedSurvivor: Survivor) {
    this.reportModal.show = true;
    this.reportModal.infectedSurvivor = infectedSurvivor;
  }

  /**
   * Close report modal
   */
  closeReportModal() {
    this.reportModal.show = false;
  }

}
