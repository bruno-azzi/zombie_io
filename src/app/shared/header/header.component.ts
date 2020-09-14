import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class HeaderComponent implements OnInit {

  nav = [
    { name: 'Global Reports', url: 'home' },
    { name: 'Survivor list', url: 'survivors' },
    { name: 'Add', url: 'add' }
  ];

  constructor() { }

  ngOnInit(): void {

  }

}
