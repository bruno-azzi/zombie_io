import { Inventory, ItemValueEnum } from '../types/survivor.types';

export class InventoryManagement {

  /**
   * Calculate the survivor's inventory value based on the item's price table
   * @param inventory survivor inventory object
   */
  static calculateInventoryValue(inventory: Inventory) {
    const total = (
      inventory.fijiWater * ItemValueEnum.fijiWater +
      inventory.campbellSoup * ItemValueEnum.campbellSoup +
      inventory.firstAid * ItemValueEnum.firstAid +
      inventory.ak47 * ItemValueEnum.ak47
    );

    return total;
  }

  /**
   * Parse survivor inventory to string to send to the api
   * @param items survivor inventory
   */
  static parseItemsToString(items: Inventory) {
    const { fijiWater, campbellSoup, firstAid, ak47 } = items;

    return `Fiji Water:${fijiWater ? fijiWater : 0};Campbell Soup:${campbellSoup ? campbellSoup : 0};First Aid Pouch:${firstAid ? firstAid : 0};AK47:${ak47 ? ak47 : 0}`;
  }

}
