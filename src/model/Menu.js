import Validator from '../validator/Validator';

class Menu {
  #menuBoard;
  #orderedMenus;

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
}

export default Menu;
