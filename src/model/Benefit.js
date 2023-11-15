import MENU_BOARD from '../constants/menuBoard';
import {
  WEEKEND_EVENT,
  WEEKDAY_EVENT,
  SPECIAL_EVENT,
} from '../constants/eventDate';

class Benefit {
  christmasDiscount(reservationDate, totalPrice) {
    if (reservationDate >= 1 && reservationDate <= 25 && totalPrice >= 10000) {
      return -1000 - 100 * (reservationDate - 1);
    }
    return false;
  }

  weekendDiscount(reservationDate, orderedMenus, totalPrice) {
    const dessertMenu = MENU_BOARD.filter(
      category => category.category === '디저트',
    ).flatMap(category => Object.keys(category.menu));

    let dessertCount = 0;
    const menuNames = orderedMenus.map(([name]) => name);
    const menuCounts = orderedMenus.map(([, count]) => count);

    menuNames.forEach((menu, index) => {
      if (dessertMenu.includes(menu)) dessertCount += 1 * menuCounts[index];
    });

    if (
      WEEKEND_EVENT.some(date => Number(reservationDate) === date) &&
      totalPrice >= 10000
    ) {
      return -2023 * dessertCount;
    }
    return false;
  }

  weekdayDiscount(reservationDate, orderedMenus, totalPrice) {
    const mainMenu = MENU_BOARD.filter(
      category => category.category === '메인',
    ).flatMap(category => Object.keys(category.menu));

    let mainCount = 0;

    const menuNames = orderedMenus.map(([name]) => name);
    const menuCounts = orderedMenus.map(([, count]) => count);

    menuNames.forEach((menu, index) => {
      if (mainMenu.includes(menu)) mainCount += 1 * menuCounts[index];
    });

    if (
      WEEKDAY_EVENT.some(date => Number(reservationDate) === date) &&
      totalPrice >= 10000
    ) {
      return -2023 * mainCount;
    }
    return false;
  }

  specialDiscount(reservationDate, totalPrice) {
    if (
      SPECIAL_EVENT.some(date => Number(reservationDate) === date) &&
      totalPrice >= 10000
    ) {
      return -1000;
    }
    return false;
  }

  giveawayEvent(giveaway) {
    if (giveaway === '없음') return false;
    return -25000;
  }

  circulateBenefit(reservationDate, orderedMenus, totalPrice, giveaway) {
    const totalBenefit =
      (this.christmasDiscount(reservationDate, totalPrice) || 0) +
      (this.weekendDiscount(reservationDate, orderedMenus, totalPrice) || 0) +
      (this.weekdayDiscount(reservationDate, orderedMenus, totalPrice) || 0) +
      (this.specialDiscount(reservationDate, totalPrice) || 0) +
      (this.giveawayEvent(giveaway) || 0);

    return totalBenefit;
  }
}

export default Benefit;
