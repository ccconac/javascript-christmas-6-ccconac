import Badge from '../../src/model/Badge';

describe('배지 클래스 테스트', () => {
  let badge;

  beforeEach(() => {
    badge = new Badge();
  });

  test('5,000원 미만일 경우 `없음`을 보여 주는지 확인한다.', () => {
    const result = badge.eventBadge(-4000);
    expect(result).toEqual('없음');
  });

  test('5,000원 이상인 경우 `별`을 보여 주는지 확인한다.', () => {
    const result = badge.eventBadge(-8000);
    expect(result).toEqual('별');
  });

  test('10,000원 이상인 경우 `트리`를 보여 주는지 확인한다.', () => {
    const result = badge.eventBadge(-18000);
    expect(result).toEqual('트리');
  });

  test('20,000원 이상인 경우 `산타`를 보여 주는지 확인한다.', () => {
    const result = badge.eventBadge(-25000);
    expect(result).toEqual('산타');
  });
});
