import { CATEGORY, MENU_BOARD } from '../constants/menuBoard';
import {
  CHRISTMAS_EVENT,
  WEEKEND_EVENT,
  WEEKDAY_EVENT,
  SPECIAL_EVENT,
} from '../constants/date';
import { EVENT } from '../constants/constants';

class Benefit {
  constructor(order) {
    this.order = order;
  }

  static #isMinEventAmount(totalAmount) {
    return totalAmount >= EVENT.minEventAmount;
  }

  static #isEventDate(reservationDate, eventDates) {
    return eventDates.some(date => Number(reservationDate) === date);
  }

  static #getCategoryMenus(category) {
    const filterCategory = MENU_BOARD.filter(
      menuBoard => menuBoard.category === category,
    );

    const categoryMenus = filterCategory.flatMap(menuBoard =>
      Object.keys(menuBoard.menu),
    );

    return categoryMenus;
  }

  #countMenuItems(category) {
    const menuItems = Benefit.#getCategoryMenus(category);
    const { menuNames, menuCounts } = this.order.getMenuDetails();

    return menuNames.reduce((itemCount, menu, index) => {
      if (menuItems.includes(menu)) return itemCount + menuCounts[index];
      return itemCount;
    }, EVENT.zero);
  }

  christmasDiscount(reservationDate, totalAmount) {
    const benefitAmount = Benefit.#isMinEventAmount(totalAmount);
    const eventDate = Benefit.#isEventDate(reservationDate, CHRISTMAS_EVENT);

    if (benefitAmount && eventDate) {
      return EVENT.christmasDiscount(reservationDate) || EVENT.zero;
    }

    return false;
  }

  weekendDiscount(reservationDate, totalAmount) {
    const benefitAmount = Benefit.#isMinEventAmount(totalAmount);
    const eventDate = Benefit.#isEventDate(reservationDate, WEEKEND_EVENT);

    if (benefitAmount && eventDate) {
      return (
        EVENT.weekDiscount * this.#countMenuItems(CATEGORY.dessert) ||
        EVENT.zero
      );
    }

    return false;
  }

  weekdayDiscount(reservationDate, totalAmount) {
    const benefitAmount = Benefit.#isMinEventAmount(totalAmount);
    const eventDate = Benefit.#isEventDate(reservationDate, WEEKDAY_EVENT);

    if (benefitAmount && eventDate) {
      return (
        EVENT.weekDiscount * this.#countMenuItems(CATEGORY.main) || EVENT.zero
      );
    }

    return false;
  }

  specialDiscount(reservationDate, totalAmount) {
    const benefitAmount = Benefit.#isMinEventAmount(totalAmount);
    const eventDate = Benefit.#isEventDate(reservationDate, SPECIAL_EVENT);

    if (benefitAmount && eventDate) {
      return EVENT.specialDiscount || EVENT.zero;
    }

    return false;
  }

  giveawayEvent(giveaway) {
    if (giveaway === EVENT.none) return false;
    return EVENT.giveawayEvent || EVENT.zero;
  }

  circulateBenefit(reservationDate, totalAmount, giveaway) {
    const totalBenefit =
      this.christmasDiscount(reservationDate, totalAmount) +
      this.weekendDiscount(reservationDate, totalAmount) +
      this.weekdayDiscount(reservationDate, totalAmount) +
      this.specialDiscount(reservationDate, totalAmount) +
      this.giveawayEvent(giveaway);

    return totalBenefit;
  }

  circulateAfterTotal(reservationDate, totalAmount) {
    const paymentAmount =
      totalAmount +
      this.christmasDiscount(reservationDate, totalAmount) +
      this.weekendDiscount(reservationDate, totalAmount) +
      this.weekdayDiscount(reservationDate, totalAmount) +
      this.specialDiscount(reservationDate, totalAmount);

    return paymentAmount;
  }
}

export default Benefit;
