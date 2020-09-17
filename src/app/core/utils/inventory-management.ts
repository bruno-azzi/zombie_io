import { Inventory, ItemValueEnum } from '../types/survivor.types';

export class InventoryManagement {

  static calculateInventoryValue(inventory: Inventory) {
    const total = (
      inventory.fijiWater * ItemValueEnum.fijiWater +
      inventory.campbellSoup * ItemValueEnum.campbellSoup +
      inventory.firstAid * ItemValueEnum.firstAid +
      inventory.ak47 * ItemValueEnum.ak47
    );

    return total;
  }

  static parseItemsToString(items: Inventory) {
    const { fijiWater, campbellSoup, firstAid, ak47 } = items;

    return `Fiji Water:${fijiWater};Campbell Soup:${campbellSoup};First Aid Pouch:${firstAid};AK47:${ak47}`;
  }

}
