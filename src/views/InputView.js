import { Console } from '@woowacourse/mission-utils';
import { INPUT_MESSAGE } from '../constants/messages';

const InputView = {
  async readDate() {
    const inputDate = await Console.readLineAsync(INPUT_MESSAGE.reservationDate);
    return inputDate;
  },

  async readOrder() {
    const inputOrder = await Console.readLineAsync(INPUT_MESSAGE.orderMenu);
    return inputOrder;
  },
};

export default InputView;
