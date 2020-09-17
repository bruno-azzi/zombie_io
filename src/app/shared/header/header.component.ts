import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import gsap, { Power4 } from 'gsap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class HeaderComponent implements OnInit {

  nav = [
    { name: 'Global Reports', url: 'home' },
    { name: 'Survivor List', url: 'survivors' },
    { name: 'New Survivor', url: 'add' },
    { name: 'Trade', url: 'trade' }
  ];

  menuOpened = false;
  tl = gsap.timeline();

  constructor() { }

  ngOnInit(): void {

  }

  toggleMenu(): void {
    this.menuOpened ? this.closeMenu() : this.openMenu();
  }

  openMenu(): void {
    if (window.innerWidth < 768) {
      this.menuOpened = true;
      this.tl.clear();

      gsap.set('body, html', { overflow: 'hidden' });

      this.tl
        .to('[data-component="header"] .menu-list', { duration: .8, x: 0, ease: Power4.easeOut }, 0)
        .to('[data-component="header"] .menu-item', { duration: .8, x: 0, ease: Power4.easeOut, stagger: .2 }, 0);
    }
  }

  closeMenu(): void {
    if (window.innerWidth < 768) {
      this.menuOpened = false;
      this.tl.clear();

      this.tl
        .to('[data-component="header"] .menu-list', { duration: .8, x: '-150%', ease: Power4.easeOut }, 0)
        .set('[data-component="header"] .menu-item', { x: '-150%' }, -.4);

      gsap.set('body, html', { overflow: '' });
    }
  }

}
