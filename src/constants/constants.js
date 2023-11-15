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
  zero: 0,
  none: '없음',
  giveaway: '샴페인 1개',
});

const BADGE = Object.freeze({
  starBadgeAmount: 5_000,
  treeBadgeAmount: 10_000,
  santaBadgeAmount: 20_000,
  starBadge: '별',
  treeBadge: '트리',
  santaBadge: '산타',
  noBadge: '없음',
});

export { MAGIC_NUMBER, EVENT, BADGE };
