import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-price-table',
  templateUrl: './price-table.component.html',
  styleUrls: ['./price-table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PriceTableComponent implements OnInit {

  priceTable = [
    {
      value: 14,
      name: 'Fiji Water',
      img: 'assets/img/fiji-water.png'
    },
    {
      value: 12,
      name: 'Campbell Soup',
      img: 'assets/img/campbell-soup.png'
    },
    {
      value: 10,
      name: 'First Aid Pouch',
      img: 'assets/img/first-aid-pouch.png'
    },
    {
      value: 8,
      name: 'AK-47',
      img: 'assets/img/ak47.png'
    }
  ];

  constructor() { }

  ngOnInit(): void {

  }

}
