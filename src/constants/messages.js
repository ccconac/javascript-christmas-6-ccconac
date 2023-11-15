const INPUT_MESSAGE = Object.freeze({
  reservationDate: '12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)\n',
  orderMenu: '주문하실 메뉴를 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)\n',
});

const OUTPUT_MESSAGE = Object.freeze({
  greeting: '안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.',
  preview: reservationDate => `12월 ${reservationDate}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!\n`,
  orderedMenus: (menuName, count) => `${menuName} ${count}개`,
  beforeTotalAmount: orderAmount => `${orderAmount}원`,
  totalBenefit: benefit => `${benefit}원`,
  paymentAmount: amount => `${amount}원`,
  giveawayEvent: giveaway => `${giveaway}`,
  eventBadge: badge => `${badge}`,
});

const DISCOUNT_OUTPUT = Object.freeze({
  christmasDiscount: christmasEvent => `크리스마스 디데이 할인: ${christmasEvent}원`,
  weekendDiscount: weekendEvent => `평일 할인: ${weekendEvent}원`,
  weekdayDiscount: weekdayEvent => `주말 할인: ${weekdayEvent}원`,
  specialDiscount: specialEvent => `특별 할인: ${specialEvent}원`,
  giftEvent: giveawayEvent => `증정 이벤트: ${giveawayEvent}원`,
  none: '없음',
});

const ERROR_PREFIX = '[ERROR]';

const ERROR_MESSAGE = Object.freeze({
  invalidDate: `${ERROR_PREFIX} 유효하지 않은 날짜입니다. 다시 입력해 주세요.`,
  invalidOrder: `${ERROR_PREFIX} 유효하지 않은 주문입니다. 다시 입력해 주세요.`,
  invalidTotal: `${ERROR_PREFIX} 메뉴는 총 20개까지만 주문 가능합니다. 다시 입력해 주세요.`,
  invalidDrink: `${ERROR_PREFIX} 음료 외 다른 메뉴 주문이 추가로 필요합니다.`,
});

export { INPUT_MESSAGE, OUTPUT_MESSAGE, DISCOUNT_OUTPUT, ERROR_MESSAGE };
