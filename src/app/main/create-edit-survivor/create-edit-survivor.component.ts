import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SurvivorsService } from './../../core/services/survivors.service';

@Component({
  selector: 'app-create-edit-survivor',
  templateUrl: './create-edit-survivor.component.html',
  styleUrls: ['./create-edit-survivor.component.scss']
})
export class CreateEditSurvivorComponent implements OnInit {

  form: FormGroup;
  survivorId: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private service: SurvivorsService
  ) { }

  ngOnInit(): void {
    this.createForm();

    if (this.isEditPage()) {
      this.survivorId = this.route.snapshot.paramMap.get('id');
      this.getSurvivorById(this.survivorId);
    }
  }

  createForm() {
    this.form = this.fb.group({
      name: [null, Validators.required],
      age: [null, Validators.required],
      gender: [null, Validators.required],
      lonlat: [null],
      items: [null, Validators.required],
      water: [0, Validators.required],
      food: [0, Validators.required],
      medication: [0, Validators.required],
      ammo: [0, Validators.required]
    });
  }

  getSurvivorById(id: string) {
    this.service.getById(id).subscribe(data => {
      console.log(data);
    });
  }

  onSubmit() {
    console.log(this.form.value);
  }

  isEditPage() {
    return this.route.snapshot.paramMap.get('id') ? true : false;
  }

}
