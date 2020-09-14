import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-section-title',
  templateUrl: './section-title.component.html',
  styleUrls: ['./section-title.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class SectionTitleComponent implements OnInit {

  @Input() title: string;
  @Input() total = 0;

  constructor() { }

  ngOnInit(): void {

  }

}
