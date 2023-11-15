import { ERROR_MESSAGE } from '../constants/messages';

class Validator {
  static dateValidator(date) {
    this.#numberValidator(date);
    this.#dateRangeValidator(date);
  }

  static menuValidator(order, menuBoard, orderedMenus) {
    this.#formValidator(order);
    this.#menuNameValidator(menuBoard, orderedMenus);
    this.#menuCountValidator(orderedMenus);
    this.#duplicateMenuValidator(orderedMenus);
    this.#totalCountValidator(orderedMenus);
    this.#onlyDrinkValidator(menuBoard, orderedMenus);
  }

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

  static #numberValidator(date) {
    if (!Validator.#validateNumber(date)) {
      throw new Error(ERROR_MESSAGE.invalidDate);
    }
  }

  static #dateRangeValidator(date) {
    if (!Validator.#validateDateRange(date)) {
      throw new Error(ERROR_MESSAGE.invalidDate);
    }
  }

  static #formValidator(order) {
    if (!Validator.#validateForm(order)) {
      throw new Error(ERROR_MESSAGE.invalidOrder);
    }
  }

  static #menuNameValidator(menuBoard, orderedMenus) {
    if (!Validator.#validateMenuName(menuBoard, orderedMenus)) {
      throw new Error(ERROR_MESSAGE.invalidOrder);
    }
  }

  static #menuCountValidator(orderedMenus) {
    if (!Validator.#validateMenuCount(orderedMenus)) {
      throw new Error(ERROR_MESSAGE.invalidOrder);
    }
  }

  static #duplicateMenuValidator(orderedMenus) {
    if (!Validator.#validateDuplicateMenu(orderedMenus)) {
      throw new Error(ERROR_MESSAGE.invalidOrder);
    }
  }

  static #totalCountValidator(orderedMenus) {
    if (Validator.#validateTotalCount(orderedMenus)) {
      throw new Error(ERROR_MESSAGE.invalidTotal);
    }
  }

  static #onlyDrinkValidator(menuBoard, orderedMenus) {
    if (Validator.#validateOnlyDrink(menuBoard, orderedMenus)) {
      throw new Error(ERROR_MESSAGE.needExtraMenu);
    }
  }
}

export default Validator;
