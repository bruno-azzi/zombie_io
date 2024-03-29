import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, forwardRef, Input, OnInit, ViewEncapsulation, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true
    }
  ]
})

export class DropdownComponent implements OnInit {

  @Input() placeholder = 'Select';
  @Input() searchPlaceholder = 'Search';
  @Input() searchOnKey = 'name';
  @Input() displayKey = 'name';
  @Input() label: string;
  @Input() options = [];
  @Input() formControl = new FormControl();

  @Output() selectionChanged = new EventEmitter();

  config = {};

  constructor() { }

  ngOnInit(): void {
    this.config = {
      displayKey: this.displayKey,
      search: true,
      placeholder: this.placeholder,
      limitTo: 0,
      noResultsFound: 'No results found',
      searchPlaceholder: this.searchPlaceholder,
      searchOnKey: this.searchOnKey,
      clearOnSelection: true
    };
  }

  onChange(change) {
    this.selectionChanged.emit(change.value);
  }

  writeValue(): void {}

  registerOnChange(): void {}

  registerOnTouched(): void {}

}
