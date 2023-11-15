import Validator from './Validator';
import { MENU_BOARD } from '../constants/menuBoard';
import { EVENT } from '../constants/constants';

class Order {
  #orderedMenus;

  #totalAmount;

  constructor() {
    this.#orderedMenus = [];
  }

  getOrderedMenus(order) {
    this.#setMenus(order);
    Validator.menuValidator(order, MENU_BOARD, this.#orderedMenus);

    return this.#orderedMenus;
  }

  #getMenuNames() {
    return this.#orderedMenus.map(([name]) => name);
  }

  #getMenuCounts() {
    return this.#orderedMenus.map(([, count]) => count);
  }

  getMenuDetails() {
    return {
      menuNames: this.#getMenuNames(),
      menuCounts: this.#getMenuCounts(),
    };
  }

  #setMenus(order) {
    this.#orderedMenus = [];

    const menus = order.split(',').map(menu => {
      const [name, count] = menu.split('-');
      return [name, Number(count)];
    });

    this.#orderedMenus = this.#orderedMenus.concat(menus);
  }

  #calculateTotalAmount() {
    const { menuNames, menuCounts } = this.getMenuDetails();

    return menuNames.reduce((sum, menuName, index) => {
      const category = MENU_BOARD.find(menuBoard => menuName in menuBoard.menu);
      const totalAmount = sum + category.menu[menuName] * menuCounts[index];

      return totalAmount;
    }, 0);
  }

  getBeforeTotalAmount() {
    this.#totalAmount = this.#calculateTotalAmount();
    return this.#totalAmount;
  }

  getGiveawayMenu() {
    if (this.#totalAmount < EVENT.minGiveawayAmount) return EVENT.none;
    return EVENT.giveaway;
  }
}

export default Order;
