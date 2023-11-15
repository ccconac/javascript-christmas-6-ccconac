import { Console } from '@woowacourse/mission-utils';
import { OUTPUT_MESSAGE, DISCOUNT_OUTPUT } from '../constants/messages';
import TITLE from '../constants/title';

const OutputView = {
  printErrorMessage(message) {
    Console.print(message);
  },

  printGreeting() {
    Console.print(OUTPUT_MESSAGE.greeting);
  },

  printPreview(reservationDate) {
    Console.print(OUTPUT_MESSAGE.preview(reservationDate));
  },

  printMenu(orderedMenus) {
    Console.print(TITLE.orderMenu);
    orderedMenus.forEach(([menuName, count]) => {
      Console.print(OUTPUT_MESSAGE.orderedMenus(menuName, count));
    });
  },

  printBeforeTotal(orderAmount) {
    Console.print(TITLE.beforeTotalPrice);
    Console.print(OUTPUT_MESSAGE.beforeTotalAmount(orderAmount));
  },

  printGiveaway(giveaway) {
    Console.print(TITLE.giveawayMenu);
    Console.print(OUTPUT_MESSAGE.giveawayEvent(giveaway));
  },

  printEvent() {
    Console.print(TITLE.benefitDetails);
  },

  printChristmasEvent(christmasEvent) {
    Console.print(DISCOUNT_OUTPUT.christmasDiscount(christmasEvent));
  },

  printWeekendEvent(weekendEvent) {
    Console.print(DISCOUNT_OUTPUT.weekendDiscount(weekendEvent));
  },

  printWeekdayEvent(weekdayEvent) {
    Console.print(DISCOUNT_OUTPUT.weekdayDiscount(weekdayEvent));
  },

  printSpecialEvent(specialEvent) {
    Console.print(DISCOUNT_OUTPUT.specialDiscount(specialEvent));
  },

  printGiveawayEvent(giveawayEvent) {
    Console.print(DISCOUNT_OUTPUT.giftEvent(giveawayEvent));
  },

  printNoBenefit() {
    Console.print(DISCOUNT_OUTPUT.none);
  },

  printBenefit(benefit) {
    Console.print(TITLE.totalBenefit);
    Console.print(OUTPUT_MESSAGE.totalBenefit(benefit));
  },

  printAfterTotal(amount) {
    Console.print(TITLE.paymentAmount);
    Console.print(OUTPUT_MESSAGE.paymentAmount(amount));
  },

  printBadge(badge) {
    Console.print(TITLE.eventBadge);
    Console.print(OUTPUT_MESSAGE.eventBadge(badge));
  },
};

export default OutputView;
