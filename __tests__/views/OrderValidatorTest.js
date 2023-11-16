import Validator from '../../src/model/Validator';
import { ERROR_MESSAGE } from '../../src/constants/messages';
import { MENU_BOARD } from '../../src/constants/menuBoard';

describe('주문 검증 테스트', () => {
  let validator;
  let order;
  let orderedMenus;

  beforeEach(() => {
    validator = Validator;
    order = '';
    orderedMenus = [];
  });

  test.each([
    '해산물파스타-1,레드와인-',
    '해산물파스타-',
    '해산물파스타',
    '해산물파스타-1,',
  ])('입력이 메뉴 형식이 예시와 다르면 예외가 발생한다.', invalidInput => {
    expect(() =>
      validator.menuValidator(invalidInput, MENU_BOARD, orderedMenus),
    ).toThrow(ERROR_MESSAGE.invalidOrder);
  });

  test.each([
    ['해산물파스타-a', 'a'],
    ['해산물파스타-*', '*'],
    ['해산물파스타-NaN', NaN],
    ['해산물파스타-undefined', undefined],
  ])(
    '메뉴의 개수가 숫자가 아니면 예외가 발생한다.',
    (invalidInput, invalidCount) => {
      orderedMenus.push(['해산물파스타', invalidCount]);

      expect(() =>
        validator.menuValidator(invalidInput, MENU_BOARD, orderedMenus),
      ).toThrow(ERROR_MESSAGE.invalidOrder);
    },
  );

  test('입력이 메뉴판에 없는 메뉴이면 예외가 발생한다.', () => {
    order = '해산물-1';
    orderedMenus.push(['해산물', 1]);

    expect(() =>
      validator.menuValidator(order, MENU_BOARD, orderedMenus),
    ).toThrow(ERROR_MESSAGE.invalidOrder);
  });

  test('메뉴의 개수가 1 미만의 숫자이면 예외가 발생한다.', () => {
    order = '해산물파스타-0';
    orderedMenus.push(['해산물파스타', 0]);

    expect(() =>
      validator.menuValidator(order, MENU_BOARD, orderedMenus),
    ).toThrow(ERROR_MESSAGE.invalidOrder);
  });

  test('중복 메뉴를 입력하면 예외가 발생한다.', () => {
    order = '시저샐러드-1,시저샐러드-1';
    orderedMenus.push(['시저샐러드', 1], ['시저샐러드', 1]);

    expect(() =>
      validator.menuValidator(order, MENU_BOARD, orderedMenus),
    ).toThrow(ERROR_MESSAGE.invalidOrder);
  });

  test('주문한 메뉴가 20개가 넘어가면 예외가 발생한다.', () => {
    order = '티본스테이크-8,바비큐립-5,초코케이크-3,제로콜라-7';
    orderedMenus.push(
      ['티본스테이크', 8],
      ['바비큐립', 5],
      ['초코케이크', 3],
      ['제로콜라', 7],
    );

    expect(() =>
      validator.menuValidator(order, MENU_BOARD, orderedMenus),
    ).toThrow(ERROR_MESSAGE.invalidTotal);
  });

  test('음료만 주문하면 예외가 발생한다.', () => {
    order = '레드와인-1,샴페인-1';
    orderedMenus.push(['레드와인', 1], ['샴페인', 1]);

    expect(() =>
      validator.menuValidator(order, MENU_BOARD, orderedMenus),
    ).toThrow(ERROR_MESSAGE.invalidDrink);
  });
});
