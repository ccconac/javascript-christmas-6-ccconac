import Benefit from '../../src/model/Benefit';
import {
  WEEKEND_EVENT,
  WEEKDAY_EVENT,
  SPECIAL_EVENT,
} from '../../src/constants/date';

describe('혜택 클래스 테스트', () => {
  let benefit;

  beforeEach(() => {
    benefit = new Benefit();
  });

  describe('christmasDiscount() 메소드 테스트', () => {
    test('총주문 금액 10,000원부터 할인이 적용되는지 확인한다.', () => {
      const discount = benefit.christmasDiscount(3, 142000);
      expect(discount).toEqual(-1200);
    });

    test('총주문 금액이 10,000 미만일 경우 할인이 적용되지 않는지 확인한다.', () => {
      const discount = benefit.christmasDiscount(3, 8000);
      expect(discount).toEqual(false);
    });

    test.each([
      [1, 1000],
      [15, 2400],
      [25, 3400],
    ])('날짜별 할인이 올바르게 적용되는지 확인한다.', (day, discountPrice) => {
      const discount = benefit.christmasDiscount(day, 142000);
      expect(discount).toBe(-discountPrice);
    });

    test('할인 이벤트가 끝난 후 할인이 적용되지 않는지 확인한다.', () => {
      const discount = benefit.christmasDiscount(26, 142000);
      expect(discount).toBe(false);
    });
  });

  describe('weekendDiscount() 메소드 테스트', () => {
    test('총주문 금액 10,000원부터 평일 할인이 적용되는지 확인한다.', () => {
      const discount = benefit.weekendDiscount(
        3,
        [
          ['티본스테이크', 1],
          ['바비큐립', 1],
          ['초코케이크', 2],
          ['제로콜라', 1],
        ],
        142000,
      );
      expect(discount).toEqual(-4046);
    });

    test('총주문 금액이 10,000 미만일 경우 평일 할인이 적용되지 않는지 확인한다.', () => {
      const discount = benefit.weekendDiscount(3, [['시저샐러드', 1]], 8000);
      expect(discount).toEqual(false);
    });

    test.each(WEEKEND_EVENT)(
      '평일에 디저트 메뉴에 대한 할인이 올바르게 적용되는지 확인한다.',
      day => {
        const discount = benefit.weekendDiscount(
          day,
          [['초코케이크', 1]],
          15000,
        );
        expect(discount).toBe(-2023);
      },
    );

    test('디저트 메뉴가 아닌 다른 메뉴를 주문했을 때 할인이 적용되지 않는지 확인한다.', () => {
      const discount = benefit.weekendDiscount(3, [['바비큐립', 1]], 54000);
      expect(discount).toBe(-0);
    });
  });

  describe('weekdayDiscount() 메소드 테스트', () => {
    test('총주문 금액 10,000원부터 주말 할인이 적용되는지 확인한다.', () => {
      const discount = benefit.weekdayDiscount(
        1,
        [
          ['티본스테이크', 1],
          ['바비큐립', 1],
          ['초코케이크', 2],
          ['제로콜라', 1],
        ],
        142000,
      );
      expect(discount).toEqual(-4046);
    });

    test('총주문 금액이 10,000 미만일 경우 주말 할인이 적용되지 않는지 확인한다.', () => {
      const discount = benefit.weekdayDiscount(1, [['시저샐러드', 1]], 8000);
      expect(discount).toEqual(false);
    });

    test.each(WEEKDAY_EVENT)(
      '주말에 메인 메뉴에 대한 할인이 올바르게 적용되는지 확인한다.',
      day => {
        const discount = benefit.weekdayDiscount(day, [['바비큐립', 1]], 54000);
        expect(discount).toBe(-2023);
      },
    );

    test('메인 메뉴가 아닌 다른 메뉴를 주문했을 때 할인이 적용되지 않는지 확인한다.', () => {
      const discount = benefit.weekdayDiscount(1, [['초코케이크', 1]], 15000);
      expect(discount).toBe(-0);
    });
  });

  describe('specialDiscount() 메소드 테스트', () => {
    test('총주문 금액 10,000원부터 특별 할인이 적용되는지 확인한다.', () => {
      const discount = benefit.specialDiscount(3, 142000);
      expect(discount).toEqual(-1000);
    });

    test('총주문 금액이 10,000 미만일 경우 특별 할인이 적용되지 않는지 확인한다.', () => {
      const discount = benefit.specialDiscount(3, 8000);
      expect(discount).toEqual(false);
    });

    test.each(SPECIAL_EVENT)(
      '이벤트 달력에 별이 있을 때의 할인이 올바르게 적용되는지 확인한다.',
      day => {
        const discount = benefit.specialDiscount(day, 142000);
        expect(discount).toBe(-1000);
      },
    );

    test.each([1, 5, 7, 13, 16, 19, 22, 27, 30])(
      '이벤트 달력에 별이 없는 경우 할인이 적용되지 않는지 확인한다.',
      day => {
        const discount = benefit.specialDiscount(day, 142000);
        expect(discount).toBe(false);
      },
    );
  });

  describe('giveawayEvent() 메소드 테스트', () => {
    test('증정 메뉴가 있는 경우 증정 이벤트가 적용되는지 확인한다.', () => {
      const result = benefit.giveawayEvent('샴페인 1개');
      expect(result).toEqual(-25000);
    });

    test('증정 메뉴가 없는 경우 증정 이벤트가 적용되지 않는지 확인한다.', () => {
      const result = benefit.giveawayEvent('없음');
      expect(result).toEqual(false);
    });
  });

  describe('circulateBenefit() 메소드 테스트', () => {
    test('총혜택 금액을 올바르게 계산하는지 확인한다.', () => {
      const result = benefit.circulateBenefit(
        3,
        [
          ['티본스테이크', 1],
          ['바비큐립', 1],
          ['초코케이크', 2],
          ['제로콜라', 1],
        ],
        142000,
        '샴페인 1개',
      );

      expect(result).toEqual(-31246);
    });

    test('혜택이 적용되지 않은 경우 올바르게 계산하는지 확인한다.', () => {
      const result = benefit.circulateBenefit(
        26,
        [['타파스', 1]],
        5500,
        '없음',
      );

      expect(result).toEqual(0);
    });
  });

  describe('circulateAfterTotal() 메소드 테스트', () => {
    test('할인 후 예상 결제 금액을 올바르게 계산하는지 확인한다.', () => {
      const result = benefit.circulateAfterTotal(
        3,
        [
          ['티본스테이크', 1],
          ['바비큐립', 1],
          ['초코케이크', 2],
          ['제로콜라', 1],
        ],
        142000,
        '샴페인 1개',
      );

      expect(result).toEqual(135754);
    });

    test('할인 후 예상 결제 금액을 올바르게 계산하는지 확인한다.', () => {
      const result = benefit.circulateAfterTotal(26, [['타파스', 1]], 5500);

      expect(result).toEqual(5500);
    });
  });
});
