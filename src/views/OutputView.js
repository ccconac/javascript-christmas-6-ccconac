import { Console } from '@woowacourse/mission-utils';
import { OUTPUT_MESSAGE } from '../constants/messages';
import TITLE from '../constants/title';

const OutputView = {
  printErrorMessage(message) {
    Console.print(message);
  },

  printGreeting() {
    Console.print(OUTPUT_MESSAGE.start);
  },

  printPreview(date) {
    Console.print(OUTPUT_MESSAGE.preview(date));
  },

  printMenu(orderedMenus) {
    Console.print(TITLE.orderMenu);
    orderedMenus.forEach(([name, count]) => {
      Console.print(OUTPUT_MESSAGE.menu(name, count));
    });
  },

  printBeforeTotal(totalPrice) {
    Console.print(TITLE.beforeTotalPrice);
    Console.print(OUTPUT_MESSAGE.beforeTotalPrice(totalPrice));
  },

  printGiveaway(giveaway) {
    Console.print(TITLE.giveawayMenu);
    Console.print(giveaway);
  },
};

export default OutputView;
