import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-edit-survivor',
  templateUrl: './create-edit-survivor.component.html',
  styleUrls: ['./create-edit-survivor.component.scss']
})
export class CreateEditSurvivorComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log(this.form.value);
  }

}
