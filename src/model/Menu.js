import Validator from '../validator/Validator';
import MENU_BOARD from '../constants/menuBoard';

class Menu {
  #menuBoard;
  #orderedMenus;
  #totalPrice;

  constructor(menuBoard) {
    this.#menuBoard = menuBoard;
    this.#orderedMenus = [];
  }

  getOrderedMenus(order) {
    this.#setMenus(order);
    Validator.menuValidator(order, this.#menuBoard, this.#orderedMenus);

    return this.#orderedMenus;
  }

  #setMenus(order) {
    this.#orderedMenus = [];
    const menus = order.split(',').map(menu => {
      const [name, count] = menu.split('-');
      return [name, Number(count)];
    });

    this.#orderedMenus.push(...menus);
  }

  circulateBeforeTotal() {
    const menuNames = this.#orderedMenus.map(([name]) => name);
    const menuCounts = this.#orderedMenus.map(([, count]) => count);

    this.#totalPrice = menuNames.reduce((sum, menuName, index) => {
      const category = MENU_BOARD.find(menuBoard => menuName in menuBoard.menu);
      sum += category.menu[menuName] * menuCounts[index];

      return sum;
    }, 0);

    return this.#totalPrice;
  }

  getGiveawayMenu() {
    if (this.#totalPrice < 120000) return '없음';
    return '샴페인 1개';
  }
}

export default Menu;
