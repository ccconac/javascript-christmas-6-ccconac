const MENU_BOARD = Object.freeze([
  {
    category: '에피타이저',
    menu: {
      양송이수프: 6_000,
      타파스: 5_500,
      시저샐러드: 8_000,
    },
  },
  {
    category: '메인',
    menu: {
      티본스테이크: 55_000,
      바비큐립: 54_000,
      해산물파스타: 35_000,
      크리스마스파스타: 25_000,
    },
  },
  {
    category: '디저트',
    menu: {
      초코케이크: 15_000,
      아이스크림: 5_000,
    },
  },
  {
    category: '음료',
    menu: {
      제로콜라: 3_000,
      레드와인: 60_000,
      샴페인: 25_000,
    },
  },
]);

const CATEGORY = Object.freeze({
  beverage: '음료',
});

export { MENU_BOARD, CATEGORY };
