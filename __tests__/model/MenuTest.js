import Menu from '../../src/model/Menu';
import MENU_BOARD from '../../src/constants/menuBoard';

describe('메뉴 클래스 테스트', () => {
  let menu;
  let order;

  beforeEach(() => {
    order = '티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1';
    menu = new Menu(MENU_BOARD);
  });

  test('주문한 메뉴가 배열에 올바르게 포함되는지 확인한다.', () => {
    const result = menu.getOrderedMenus(order);
    expect(result).toEqual([
      ['티본스테이크', 1],
      ['바비큐립', 1],
      ['초코케이크', 2],
      ['제로콜라', 1],
    ]);
  });

  test('사용자가 주문한 할인 전 총주문 금액을 올바르게 계산하는지 확인한다.', () => {
    menu.getOrderedMenus(order);
    const result = menu.circulateBeforeTotal();

    expect(result).toEqual(142000);
  });

  test('할인 전 총주문 금액이 12만 원 이상일 때, 샴페인 1개를 증정하는지 확인한다.', () => {
    menu.getOrderedMenus(order);
    menu.circulateBeforeTotal();
    const result = menu.getGiveawayMenu();

    expect(result).toEqual('샴페인 1개');
  });

  test('증정 이벤트에 해당하지 않는 경우, 증정 메뉴 `없음`을 보여 주는지 확인한다.', () => {
    order = '티본스테이크-1,제로콜라-1';
    menu.getOrderedMenus(order);
    menu.circulateBeforeTotal();
    const result = menu.getGiveawayMenu();

    expect(result).toEqual('없음');
  });
});
