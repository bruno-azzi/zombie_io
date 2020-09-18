import { of, Subscription } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, mergeMap } from 'rxjs/operators';
import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class FilterComponent implements OnInit, OnDestroy {

  form: FormGroup;
  subscription: Subscription;
  loading = false;

  @Output() loaderOutput = new EventEmitter();
  @Output() filterOutput = new EventEmitter();

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }

  /**
   * Initialize form
   */
  createForm(): void {
    this.form = this.fb.group({
      name: '',
      id: ''
    });

    /**
     * Keep listening for changes in the filter input
     */
    this.subscription = this.form.valueChanges.pipe(
      map(() => {
        this.loaderOutput.emit();
        return this.form.value;
      }),
      debounceTime(300),
      distinctUntilChanged(),
      mergeMap(search => of(search))).subscribe(() => this.filterOutput.emit(this.form.value));
  }

  /**
   * Unsubscribe from filter valueChanges subscription
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
