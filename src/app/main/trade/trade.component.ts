import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Survivor, Inventory } from 'src/app/core/types/survivor.types';
import { AlertService } from './../../core/services/alert/alert.service';
import { InventoryManagement } from './../../core/utils/inventory-management';
import { SurvivorsService } from './../../core/services/survivors/survivors.service';

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class TradeComponent implements OnInit {

  form: FormGroup;
  loading = false;
  firstSurvivorLoading = false;
  secondSurvivorLoading = false;
  survivors: Survivor[];
  filteredSurvivors: Survivor[];
  resetedInventory = {
    fijiWater: 0,
    campbellSoup: 0,
    firstAid: 0,
    ak47: 0
  };
  calculateInventoryValue = InventoryManagement.calculateInventoryValue;

  constructor(
    private fb: FormBuilder,
    private alert: AlertService,
    private service: SurvivorsService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getSurvivorList();
  }

  /**
   * Initiliaze form
   */
  createForm() {
    this.form = this.fb.group({
      firstSurvivor: [''],
      secondSurvivor: [''],
      firstOffer: this.fb.group({
        fijiWater: [0],
        campbellSoup: [0],
        firstAid: [0],
        ak47: [0]
      }),
      firstInventory: this.fb.group({
        fijiWater: [0],
        campbellSoup: [0],
        firstAid: [0],
        ak47: [0]
      }),
      secondInventory: this.fb.group({
        fijiWater: [0],
        campbellSoup: [0],
        firstAid: [0],
        ak47: [0]
      }),
      secondOffer: this.fb.group({
        fijiWater: [0],
        campbellSoup: [0],
        firstAid: [0],
        ak47: [0]
      }),
    });
  }

  /**
   * Get a list of survivors
   */
  getSurvivorList() {
    this.loading = true;

    this.service.get().subscribe((data: Survivor[]) => {
      this.survivors = data.filter(survivor => !survivor.infected);
      this.filteredSurvivors = this.survivors;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  /**
   * On change survivor in the dropdown component
   * @param survivor new survivor
   * @param type firstSurvivor || secondSurvivor
   */
  onChangeSurvivor(survivor: Survivor, type: string) {
    const firstSurvivor = this.form.get('firstSurvivor').value;
    const secondSurvivor = this.form.get('secondSurvivor').value;

    this.filteredSurvivors = this.survivors.filter(surv => {
      return surv.id !== firstSurvivor.id && surv.id !== secondSurvivor.id;
    });

    this.resetOffersAndInventories(type);
    this.getSurvivorInventory(survivor.id, type);
  }

  /**
   * Reset survivors trade offers and inventories
   * @param type firstSurvivor || secondSurvivor
   */
  resetOffersAndInventories(type: string) {
    if (type === 'firstSurvivor') {
      this.form.get('firstInventory').patchValue(this.resetedInventory);
      this.form.get('firstOffer').patchValue(this.resetedInventory);
    } else {
      this.form.get('secondInventory').patchValue(this.resetedInventory);
      this.form.get('secondOffer').patchValue(this.resetedInventory);
    }
  }

  /**
   * Get survivor inventory by his id
   * @param id survivor id
   * @param type firstSurvivor || secondSurvivor
   */
  getSurvivorInventory(id: string, type: string) {
    if (type === 'firstSurvivor') {
      this.firstSurvivorLoading = true;
    } else {
      this.secondSurvivorLoading = true;
    }

    this.service.getSurvivorInventory(id).subscribe((data: Inventory) => {
      if (type === 'firstSurvivor') {
        this.firstSurvivorLoading = false;
        this.form.get('firstInventory').patchValue(data);
      } else {
        this.secondSurvivorLoading = false;
        this.form.get('secondInventory').patchValue(data);
      }
    }, error => {
      this.firstSurvivorLoading = false;
      this.secondSurvivorLoading = false;
    });
  }

  /**
   * Add an item to the survivor offer
   * @param param0 object containing item name and amount
   * @param type firstOffer || secondOffer
   */
  addItemToOffer({ name, amount }, type: string) {
    if (type === 'firstOffer') {
      this.form.get('firstOffer').get(name).patchValue(amount > 0 ? 1 : 0);
      this.form.get('firstOffer').get(name).setValidators([Validators.max(amount - 1)]);
      this.form.get('firstOffer').get(name).markAsDirty();
    } else {
      this.form.get('secondOffer').get(name).patchValue(amount > 0 ? 1 : 0);
      this.form.get('secondOffer').get(name).setValidators([Validators.max(amount - 1)]);
      this.form.get('secondOffer').get(name).markAsDirty();
    }
  }

  /**
   * Check if trade is valid, both offers must have same the value and be different than zero
   */
  isTradeValid() {
    const totalFirst = this.calculateInventoryValue(this.form.get('firstOffer').value);
    const totalSecond = this.calculateInventoryValue(this.form.get('secondOffer').value);

    return this.form.valid && (totalFirst !== 0 && totalSecond !== 0) && totalFirst === totalSecond ? true : false;
  }

  /**
   * Make a trade request
   */
  trade() {
    if (this.isTradeValid()) {
      this.loading = true;

      const id = this.form.get('firstSurvivor').value.id;
      const payload = this.createPayload();

      this.service.trade(id, payload).subscribe(data => {
        this.loading = false;
        this.alert.showSuccess('Success', 'The trade was successful');
        this.prepareToNewTrade();
      }, error => {
        this.loading = false;
      });
    }
  }

  /**
   * Format trade payload to send to api
   */
  createPayload() {
    const payload = {
      consumer: {
        name: this.form.get('secondSurvivor').value.name,
        pick: InventoryManagement.parseItemsToString(this.form.get('firstOffer').value),
        payment: InventoryManagement.parseItemsToString(this.form.get('secondOffer').value)
      }
    };

    return JSON.stringify(payload);
  }

  /**
   * After a trade is successful completed, adjust the screen to make a new one
   */
  prepareToNewTrade() {
    const firstSurvivorId = this.form.get('firstSurvivor').value.id;
    const secondSurvivorId = this.form.get('secondSurvivor').value.id;

    this.getSurvivorInventory(firstSurvivorId, 'firstSurvivor');
    this.getSurvivorInventory(secondSurvivorId, 'secondSurvivor');

    this.form.get('firstOffer').patchValue(this.resetedInventory);
    this.form.get('secondOffer').patchValue(this.resetedInventory);
  }

}
