import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, Input, OnInit, ViewEncapsulation, forwardRef } from '@angular/core';

interface SelectType {
  label: string;
  value: any;
}

interface ConditionToggleOptions {
  left: SelectType;
  right: SelectType;
}

@Component({
  selector: 'app-condition-toggle',
  templateUrl: './condition-toggle.component.html',
  styleUrls: ['./condition-toggle.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ConditionToggleComponent),
      multi: true
    }
  ]
})

export class ConditionToggleComponent implements OnInit {

  @Input() label: string;
  @Input() control: FormControl;
  @Input() options: ConditionToggleOptions;

  constructor() { }

  ngOnInit(): void {
    if (!this.control) {
      this.control = new FormControl(this.options.right.value);
    }
  }

  onSelect(value) {
    if (this.control) {
      this.control.patchValue(value);
    }
  }

  writeValue() {}

  registerOnChange() {}

  registerOnTouched() {}

}
