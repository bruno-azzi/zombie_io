import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})

export class InputComponent implements OnInit {

  @Input() type = 'text';
  @Input() id: string;
  @Input() label: string;
  @Input() placeholder = '';
  @Input() maxlength: number;
  @Input() inputMask: string;
  @Input() formControl = new FormControl();
  @Input() icon: string;
  @Input() errorMessages;

  @ViewChild('input')
  public searchElementRef: ElementRef;

  @Output() inputChanged = new EventEmitter();

  constructor() { }

  ngOnInit(): void {

  }

  onChange(change): void {
    this.inputChanged.emit(change);
  }

  writeValue(): void {}

  registerOnChange(): void {}

  registerOnTouched(): void {}

}
