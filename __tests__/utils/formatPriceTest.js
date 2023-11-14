import formatPrice from '../../src/utils/formatPrice';

describe('formatPrice() 메소드 테스트', () => {
  test('1,000원 단위마다 콤마(,)로 구분해 출력하는지 확인한다.', () => {
    const result = formatPrice(142000);
    expect(result).toBe('142,000');
  });
});
