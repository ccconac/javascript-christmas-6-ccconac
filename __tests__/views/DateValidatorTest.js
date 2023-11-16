import Validator from '../../src/model/Validator';
import { ERROR_MESSAGE } from '../../src/constants/messages';

describe('방문 날짜 검증 테스트', () => {
  let validator;

  beforeEach(() => {
    validator = Validator;
  });

  test.each(['a', NaN, undefined, '-*#!'])(
    '방문 날짜가 숫자가 아니면 예외가 발생한다.',
    invalidInput => {
      expect(() => validator.dateValidator(invalidInput)).toThrow(
        ERROR_MESSAGE.invalidDate,
      );
    },
  );

  test.each([0, 32, -1])(
    '방문 날짜의 범위가 1-31을 벗어나면 예외가 발생한다.',
    invalidInput => {
      expect(() => validator.dateValidator(invalidInput)).toThrow(
        ERROR_MESSAGE.invalidDate,
      );
    },
  );
});
