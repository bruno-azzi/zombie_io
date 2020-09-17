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

  @Input() survivors: Survivor[];
  @Input() selectControl = new FormControl();
  @Input() selectPlaceholder: string;
  @Input() inventoryForm: FormGroup;

  @Output() survivorChanged = new EventEmitter();

  calculateInventoryValue = InventoryManagement.calculateInventoryValue;

  constructor() { }

  ngOnInit(): void {

  }

}
