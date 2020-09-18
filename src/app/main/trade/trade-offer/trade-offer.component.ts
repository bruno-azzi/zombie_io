import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit, ViewEncapsulation, Input, EventEmitter, Output } from '@angular/core';

import { Survivor } from 'src/app/core/types/survivor.types';
import { InventoryManagement } from 'src/app/core/utils/inventory-management';

@Component({
  selector: 'app-trade-offer',
  templateUrl: './trade-offer.component.html',
  styleUrls: ['./trade-offer.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class TradeOfferComponent implements OnInit {

  /** List of survivors */
  @Input() survivors: Survivor[];

  /** FormControl for the dropdown component */
  @Input() selectControl = new FormControl();

  /** Dropdown placeholder text */
  @Input() selectPlaceholder: string;

  /** Inventory formControl */
  @Input() inventoryForm: FormGroup;

  /** Triggered when changing survivor in dropdown */
  @Output() survivorChanged = new EventEmitter();

  /** Calculate survivor inventory value */
  calculateInventoryValue = InventoryManagement.calculateInventoryValue;

  constructor() { }

  ngOnInit(): void {

  }

}
