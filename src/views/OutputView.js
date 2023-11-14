import { Console } from '@woowacourse/mission-utils';
import { OUTPUT_MESSAGE } from '../constants/messages';

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

  printMenu() {
    Console.print('<주문 메뉴>');
  },
};

export default OutputView;
