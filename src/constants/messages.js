const INPUT_MESSAGE = Object.freeze({
  date: '12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)\n',
});

const OUTPUT_MESSAGE = Object.freeze({
  start: '안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.',
});

const ERROR_PREFIX = '[ERROR]';

const ERROR_MESSAGE = Object.freeze({
  invalidDate: `${ERROR_PREFIX} 유효하지 않은 날짜입니다. 다시 입력해 주세요.`,
});

export { INPUT_MESSAGE, OUTPUT_MESSAGE, ERROR_MESSAGE };
