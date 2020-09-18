import { FormGroup } from '@angular/forms';
import { Component, Input, OnChanges, OnInit, ViewEncapsulation, SimpleChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class InventoryComponent implements OnInit, OnChanges {

  itemList = [
    {
      formControlName: 'fijiWater',
      name: 'Fiji Water',
      img: 'assets/img/fiji-water.png'
    },
    {
      formControlName: 'campbellSoup',
      name: 'Campbell Soup',
      img: 'assets/img/campbell-soup.png'
    },
    {
      formControlName: 'firstAid',
      name: 'First Aid Pouch',
      img: 'assets/img/first-aid-pouch.png'
    },
    {
      formControlName: 'ak47',
      name: 'AK-47',
      img: 'assets/img/ak47.png'
    }
  ];

  @Input() form: FormGroup;
  @Input() editableForm = true;
  @Input() showOnlyBiggerThanZero = false;

  @Output() itemClicked = new EventEmitter();

  constructor() { }

  ngOnInit(): void {

  }

  ngOnChanges(change: SimpleChanges) {
    if (change.form) {
      this.form = change.form.currentValue;
    }
  }

  onItemClick(formControlName: string, amount: number) {
    this.itemClicked.emit({
      name: formControlName,
      amount
    });
  }

}
