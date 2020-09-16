import { Component, Input, OnInit, Output, ViewEncapsulation, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ButtonComponent implements OnInit {

  @Input() title: string;
  @Input() icon: string;
  @Input() disabled = false;
  @Input() loading = false;
  @Input() type = 'button';
  @Input() tooltip: string;

  @Output() clickOutput = new EventEmitter();

  constructor() { }

  ngOnInit(): void {

  }

}
