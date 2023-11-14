import { ERROR_MESSAGE } from '../constants/messages';

class Validator {
  static #validateNumber(date) {
    return /^[0-9]+$/.test(date);
  }

  static #validateDateRange(date) {
    return date > 0 && date < 32;
  }

  static #validateForm(order) {
    return /^([가-힣]+-\d+,)*[가-힣]+-\d+$/.test(order);
  }

  static #validateMenuName(menuBoard, orderedMenus) {
    return orderedMenus.every(([name]) =>
      menuBoard.some(category => name in category.menu),
    );
  }

  static #validateMenuCount(orderedMenus) {
    return orderedMenus.every(([, count]) => count > 0);
  }

  static #validateDuplicateMenu(orderedMenus) {
    const menuNames = orderedMenus.map(([name]) => name);
    return menuNames.length === new Set(menuNames).size;
  }

  static #validateTotalCount(orderedMenus) {
    const menuCounts = orderedMenus.map(([, count]) => count);
    const totalMenu = menuCounts.reduce((sum, count) => sum + count, 0);
    return totalMenu > 20;
  }

  static #validateOnlyDrink(menuBoard, orderedMenus) {
    const menuNames = orderedMenus.map(([name]) => name);
    const isOnlyDrink = menuNames.every(menuName =>
      menuBoard.some(
        category => category.category === '음료' && menuName in category.menu,
      ),
    );

    return isOnlyDrink;
  }

  static dateValidator(date) {
    if (!Validator.#validateNumber(date)) {
      throw new Error(ERROR_MESSAGE.invalidDate);
    }

    if (!Validator.#validateDateRange(date)) {
      throw new Error(ERROR_MESSAGE.invalidDate);
    }
  }

  static menuValidator(order, menuBoard, orderedMenus) {
    if (!Validator.#validateForm(order)) {
      throw new Error(ERROR_MESSAGE.invalidOrder);
    }

    if (!Validator.#validateMenuName(menuBoard, orderedMenus)) {
      throw new Error(ERROR_MESSAGE.invalidOrder);
    }

    if (!Validator.#validateMenuCount(orderedMenus)) {
      throw new Error(ERROR_MESSAGE.invalidOrder);
    }

    if (!Validator.#validateDuplicateMenu(orderedMenus)) {
      throw new Error(ERROR_MESSAGE.invalidOrder);
    }

    if (Validator.#validateTotalCount(orderedMenus)) {
      throw new Error(ERROR_MESSAGE.invalidTotal);
    }

    if (Validator.#validateOnlyDrink(menuBoard, orderedMenus)) {
      throw new Error(ERROR_MESSAGE.invalidDrink);
    }
  }
}

export default Validator;
