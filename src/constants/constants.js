const MAGIC_NUMBER = Object.freeze({
  maxMenuCount: 20,
  zero: 0,
});

const EVENT = Object.freeze({
  minGiveawayAmount: 120_000,
  minEventAmount: 10_000,
  christmasDiscount: reservationDate => -1_000 - 100 * (reservationDate - 1),
  weekDiscount: -2_023,
  specialDiscount: -1_000,
  giveawayEvent: -25_000,
  none: '없음',
  giveaway: '샴페인 1개',
});

export { MAGIC_NUMBER, EVENT };
