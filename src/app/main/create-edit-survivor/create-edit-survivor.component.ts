import { forkJoin } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LonLatFormatter } from 'src/app/core/utils/lonlat-formatter';
import { SurvivorsService } from './../../core/services/survivors.service';
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

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private service: SurvivorsService
  ) { }

  ngOnInit(): void {
    this.createForm();

    if (this.isEditPage()) {
      this.survivorId = this.route.snapshot.paramMap.get('id');
      this.getSurvivorById(this.survivorId);
      this.form.get('items').disable();
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
      console.log(this.survivor);
      console.log(this.form.value);
    }, error => {
      this.loading = false;
      alert('error');
      console.log('error');
    });
  }

  onSubmit() {
    this.loading = true;
    const payload: SurvivorPayload = this.formatPayload(this.form.value);
    console.log('payload', payload);

    if (this.isEditPage()) {
      this.edit(this.survivorId, payload);
    } else {
      this.create(payload);
    }
  }

  create(payload: SurvivorPayload) {
    this.service.createNewSurvivor(payload).subscribe(data => {
      console.log('response', data);
      this.loading = false;
      this.router.navigate(['/survivors']);
    }, error => {
      alert('error');
      console.log(error);
      this.loading = false;
    });
  }

  edit(id: string, payload: SurvivorPayload) {
    console.log('edit', payload)
    this.service.editSurvivor(id, payload).subscribe(data => {
      console.log('response', data);
      this.loading = false;
      this.router.navigate(['/survivors']);
    }, error => {
      alert('error');
      console.log(error);
      this.loading = false;
    });
  }

  formatPayload(form: Survivor) {
    const payload: SurvivorPayload = {
      name: form.name,
      age: form.age,
      gender: form.gender,
      items: this.isEditPage() ? null : this.parseItemsToString(form.items),
      lonlat: LonLatFormatter.parseToPointFormat(form.lonlat),
    };

    return payload;
  }

  parseItemsToString(items: Inventory) {
    const { fijiWater, campbellSoup, firstAid, ak47 } = items;

    return `Fiji Water:${fijiWater};Campbell Soup:${campbellSoup};First Aid Pouch:${firstAid};AK47:${ak47}`;
  }

  isEditPage() {
    return this.route.snapshot.paramMap.get('id') ? true : false;
  }

}
