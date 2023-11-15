import { ERROR_MESSAGE } from '../constants/messages';
import { CATEGORY } from '../constants/menuBoard';
import { DATE_RANGE } from '../constants/date';
import { MAGIC_NUMBER } from '../constants/constants';
import REGEXP from '../constants/regexp';

class Validator {
  static dateValidator(reservationDate) {
    this.#numberValidator(reservationDate);
    this.#dateRangeValidator(reservationDate);
  }

  static menuValidator(order, menuBoard, orderedMenus) {
    this.#formValidator(order);
    this.#menuNameValidator(menuBoard, orderedMenus);
    this.#menuCountValidator(orderedMenus);
    this.#duplicateMenuValidator(orderedMenus);
    this.#totalCountValidator(orderedMenus);
    this.#onlyDrinkValidator(menuBoard, orderedMenus);
  }

  static #validateNumber(reservationDate) {
    return REGEXP.numberRegexp.test(reservationDate);
  }

  static #validateDateRange(reservationDate) {
    return (
      reservationDate >= DATE_RANGE.start && reservationDate <= DATE_RANGE.end
    );
  }

  static #validateForm(order) {
    return REGEXP.orderFormRegexp.test(order);
  }

  static #validateMenuName(menuBoard, orderedMenus) {
    return orderedMenus.every(([name]) =>
      menuBoard.some(category => name in category.menu),
    );
  }

  static #validateMenuCount(orderedMenus) {
    return orderedMenus.every(([, count]) => count > MAGIC_NUMBER.zero);
  }

  static #validateDuplicateMenu(orderedMenus) {
    const menuNames = orderedMenus.map(([name]) => name);
    return menuNames.length === new Set(menuNames).size;
  }

  static #validateTotalCount(orderedMenus) {
    const menuCounts = orderedMenus.map(([, count]) => count);
    const totalMenu = menuCounts.reduce(
      (sum, count) => sum + count,
      MAGIC_NUMBER.zero,
    );

    return totalMenu > MAGIC_NUMBER.maxMenuCount;
  }

  static #validateOnlyDrink(menuBoard, orderedMenus) {
    const menuNames = orderedMenus.map(([name]) => name);
    const isOnlyDrink = menuNames.every(menuName =>
      menuBoard.some(
        category =>
          category.category === CATEGORY.beverage && menuName in category.menu,
      ),
    );

    return isOnlyDrink;
  }

  static #numberValidator(reservationDate) {
    if (!Validator.#validateNumber(reservationDate)) {
      throw new Error(ERROR_MESSAGE.invalidDate);
    }
  }

  static #dateRangeValidator(reservationDate) {
    if (!Validator.#validateDateRange(reservationDate)) {
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
