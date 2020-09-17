import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-data-card',
  templateUrl: './data-card.component.html',
  styleUrls: ['./data-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DataCardComponent implements OnInit {

  @Input() title: string;
  @Input() value: string;

  constructor() { }

  ngOnInit(): void {

  }

}
