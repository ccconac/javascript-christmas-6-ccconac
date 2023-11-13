import { Console } from '@woowacourse/mission-utils';
import { INPUT_MESSAGE } from '../constants/messages';

const InputView = {
  async readDate() {
    const inputDate = await Console.readLineAsync(INPUT_MESSAGE.date);
    return inputDate;
  },
};

export default InputView;
