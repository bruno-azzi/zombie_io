import { Injectable } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})

export class AlertService {

  /**
   * NGX-TOASTR LIB DOC: https://www.npmjs.com/package/ngx-toastr
   */

  constructor(
    private toast: ToastrService
  ) { }

  showSuccess(title: string, message?: string) {
    this.toast.success(message, title, {
      progressBar: true,
      extendedTimeOut: 2000,
      timeOut: 10000
    });
  }

  showError(title: string, message?: string) {
    this.toast.error(message, title, {
      progressBar: true,
      extendedTimeOut: 2000,
      timeOut: 10000
    });
  }

}
