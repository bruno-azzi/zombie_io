import { forkJoin } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LonLatFormatter } from 'src/app/core/utils/lonlat-formatter';
import { AlertService } from '../../core/services/alert/alert.service';
import { InventoryManagement } from './../../core/utils/inventory-management';
import { SurvivorsService } from '../../core/services/survivors/survivors.service';
import { Inventory, Survivor, SurvivorPayload } from 'src/app/core/types/survivor.types';

@Component({
  selector: 'app-create-edit-survivor',
  templateUrl: './create-edit-survivor.component.html',
  styleUrls: ['./create-edit-survivor.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class CreateEditSurvivorComponent implements OnInit {

  form: FormGroup;
  survivorId: string;
  genderOptions = {
    left: {
      label: 'Male',
      value: 'M'
    },
    right: {
      label: 'Female',
      value: 'F'
    }
  };

  errorMessages = {
    name: [
      {
        error: 'required',
        message: 'This field is required'
      },
    ],
    age: [
      {
        error: 'required',
        message: 'This field is required'
      },
    ]
  };

  loading = false;
  survivor: Survivor;
  editableInventory = true;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private alert: AlertService,
    private route: ActivatedRoute,
    private service: SurvivorsService
  ) { }

  ngOnInit(): void {
    this.createForm();

    if (this.isEditPage()) {
      this.survivorId = this.route.snapshot.paramMap.get('id');
      this.getSurvivorById(this.survivorId);
      this.editableInventory = false;
    }
  }

  createForm() {
    this.form = this.fb.group({
      name: [null, Validators.required],
      age: [null, Validators.required],
      gender: ['M', Validators.required],
      lonlat: [null],
      items: this.fb.group({
        fijiWater: [0],
        campbellSoup: [0],
        firstAid: [0],
        ak47: [0]
      })
    });
  }

  getSurvivorById(id: string) {
    this.loading = true;

    forkJoin([
      this.service.getById(id),
      this.service.getSurvivorInventory(id)
    ]).subscribe(data => {
      this.survivor = data[0];
      this.survivor.items = data[1];
      this.form.patchValue(this.survivor);
      this.loading = false;
    }, error => {
      this.loading = false;
      this.router.navigate(['/survivors']);
    });
  }

  onSubmit() {
    this.loading = true;
    const payload: SurvivorPayload = this.formatPayload(this.form.value);

    if (this.isEditPage()) {
      this.edit(this.survivorId, payload);
    } else {
      this.create(payload);
    }
  }

  create(payload: SurvivorPayload) {
    this.service.createNewSurvivor(payload).subscribe((data: Survivor) => {
      this.loading = false;
      this.router.navigate(['/survivors']);
      this.alert.showSuccess('Success', `Survivor <strong>${data.name}</strong> was successfully created.`);
    }, error => {
      this.loading = false;
    });
  }

  edit(id: string, payload: SurvivorPayload) {
    this.service.editSurvivor(id, payload).subscribe((data: Survivor) => {
      this.loading = false;
      this.router.navigate(['/survivors']);
      this.alert.showSuccess('Success', `Survivor <strong>${data.name}</strong> was successfully edited.`);
    }, error => {
      this.loading = false;
    });
  }

  formatPayload(form: Survivor) {
    const payload: SurvivorPayload = {
      name: form.name,
      age: form.age,
      gender: form.gender,
      items: this.isEditPage() ? undefined : InventoryManagement.parseItemsToString(form.items),
      lonlat: LonLatFormatter.parseToPointFormat(form.lonlat),
    };

    return payload;
  }

  isEditPage() {
    return this.route.snapshot.paramMap.get('id') ? true : false;
  }

}
