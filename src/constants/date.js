const CHRISTMAS_EVENT = Array.from({ length: 25 }, (_, i) => i + 1);

const WEEKEND_EVENT = Object.freeze([
  3, 4, 5, 6, 7, 10, 11, 12, 13, 14, 17, 18, 19, 20, 21, 24, 25, 26, 27, 28, 31,
]);

const WEEKDAY_EVENT = Object.freeze([1, 2, 8, 9, 15, 16, 22, 23, 29, 30]);
const SPECIAL_EVENT = Object.freeze([3, 10, 17, 24, 25, 31]);

const DATE_RANGE = Object.freeze({
  start: 1,
  end: 31,
});

export {
  CHRISTMAS_EVENT,
  WEEKEND_EVENT,
  WEEKDAY_EVENT,
  SPECIAL_EVENT,
  DATE_RANGE,
};
