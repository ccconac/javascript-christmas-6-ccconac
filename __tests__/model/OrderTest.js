import Order from '../../src/model/Order';
import { MENU_BOARD } from '../../src/constants/menuBoard';

describe('주문 클래스 테스트', () => {
  let order;
  let orderMenus;

  beforeEach(() => {
    orderMenus = '티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1';
    order = new Order(MENU_BOARD);
  });

  test('주문한 메뉴가 배열에 올바르게 포함되는지 확인한다.', () => {
    const result = order.getOrderedMenus(orderMenus);
    expect(result).toEqual([
      ['티본스테이크', 1],
      ['바비큐립', 1],
      ['초코케이크', 2],
      ['제로콜라', 1],
    ]);
  });

  test('사용자가 주문한 할인 전 총주문 금액을 올바르게 계산하는지 확인한다.', () => {
    order.getOrderedMenus(orderMenus);
    const result = order.getBeforeTotalAmount();

    expect(result).toEqual(142000);
  });

  test('할인 전 총주문 금액이 12만 원 이상일 때, 샴페인 1개를 증정하는지 확인한다.', () => {
    order.getOrderedMenus(orderMenus);
    order.getBeforeTotalAmount();
    const result = order.getGiveawayMenu();

    expect(result).toEqual('샴페인 1개');
  });

  test('증정 이벤트에 해당하지 않는 경우, 증정 메뉴 `없음`을 보여 주는지 확인한다.', () => {
    orderMenus = '티본스테이크-1,제로콜라-1';
    order.getOrderedMenus(orderMenus);
    order.getBeforeTotalAmount();
    const result = order.getGiveawayMenu();

    expect(result).toEqual('없음');
  });
});
