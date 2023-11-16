import Validator from '../model/Validator';
import formatPrice from '../utils/formatPrice';
import handleException from '../utils/handleException';

class Controller {
  #inputView;

  #outputView;

  #order;

  #benefit;

  #badge;

  constructor(inputView, outputView, order, benefit, badge) {
    this.#inputView = inputView;
    this.#outputView = outputView;
    this.#order = order;
    this.#benefit = benefit;
    this.#badge = badge;
  }

  async startEvent() {
    this.#printGreetingMessage();
    const reservationDate = await this.#readReservationDate();
    const orderedMenus = await this.#readMenus();
    this.#printPreviewMessage(reservationDate);
    this.#printOrderList(orderedMenus);
    this.#printBeforeTotalPrice();
    this.#printGivewayMenu();
    this.#printBenefits(reservationDate);
    this.#printTotalBenefit(reservationDate);
    this.#printAfterTotalPrice(reservationDate);
    this.#printEventBadge();
  }

  #printGreetingMessage() {
    this.#outputView.printGreeting();
  }

  async #readReservationDate() {
    return handleException(async () => {
      const reservationDate = await this.#inputView.readDate();
      Validator.dateValidator(reservationDate);

      return reservationDate;
    }, this.#outputView.printErrorMessage);
  }

  async #readMenus() {
    return handleException(async () => {
      const order = await this.#inputView.readOrder();
      const orderedMenus = this.#order.getOrderedMenus(order);

      return orderedMenus;
    }, this.#outputView.printErrorMessage);
  }

  #printPreviewMessage(reservationDate) {
    this.#outputView.printPreview(reservationDate);
  }

  #printOrderList(orderedMenus) {
    this.#outputView.printMenu(orderedMenus);
  }

  #printBeforeTotalPrice() {
    const totalPrice = this.#order.getBeforeTotalAmount();
    const formatTotalPrice = formatPrice(totalPrice);
    this.#outputView.printBeforeTotal(formatTotalPrice);
  }

  #printGivewayMenu() {
    const giveawayMenu = this.#order.getGiveawayMenu();
    this.#outputView.printGiveaway(giveawayMenu);
  }

  #applyChristmasDiscount(reservationDate) {
    const totalPrice = this.#order.getBeforeTotalAmount();
    const discount = this.#benefit.christmasDiscount(
      reservationDate,
      totalPrice,
    );

    if (!discount) return false;

    this.#outputView.printChristmasEvent(formatPrice(discount));
    return true;
  }

  #applyWeekendDiscount(reservationDate) {
    const totalPrice = this.#order.getBeforeTotalAmount();
    const discount = this.#benefit.weekendDiscount(reservationDate, totalPrice);

    if (!discount) return false;

    this.#outputView.printWeekendEvent(formatPrice(discount));
    return true;
  }

  #applyWeekdayDiscount(reservationDate) {
    const totalPrice = this.#order.getBeforeTotalAmount();
    const discount = this.#benefit.weekdayDiscount(reservationDate, totalPrice);

    if (!discount) return false;

    this.#outputView.printWeekdayEvent(formatPrice(discount));
    return true;
  }

  #applySpecialDiscount(reservationDate) {
    const totalPrice = this.#order.getBeforeTotalAmount();
    const discount = this.#benefit.specialDiscount(reservationDate, totalPrice);

    if (!discount) return false;

    this.#outputView.printSpecialEvent(formatPrice(discount));
    return true;
  }

  #applyGiveawayDiscount() {
    const giveawayMenu = this.#order.getGiveawayMenu();
    const discount = this.#benefit.giveawayEvent(giveawayMenu);

    if (!discount) return false;

    this.#outputView.printGiveawayEvent(formatPrice(discount));
    return true;
  }

  #printBenefits(reservationDate) {
    this.#outputView.printEvent();

    let isNoBenefit = false;

    isNoBenefit = this.#applyChristmasDiscount(reservationDate) || isNoBenefit;
    isNoBenefit = this.#applyWeekendDiscount(reservationDate) || isNoBenefit;
    isNoBenefit = this.#applyWeekdayDiscount(reservationDate) || isNoBenefit;
    isNoBenefit = this.#applySpecialDiscount(reservationDate) || isNoBenefit;
    isNoBenefit = this.#applyGiveawayDiscount() || isNoBenefit;

    if (!isNoBenefit) this.#outputView.printNoBenefit();
  }

  #calculateTotalBenefit(reservationDate) {
    const totalPrice = this.#order.getBeforeTotalAmount();
    const giveawayMenu = this.#order.getGiveawayMenu();

    return this.#benefit.circulateBenefit(
      reservationDate,
      totalPrice,
      giveawayMenu,
    );
  }

  #printTotalBenefit(reservationDate) {
    const totalBenefit = this.#calculateTotalBenefit(reservationDate);
    this.#outputView.printBenefit(formatPrice(totalBenefit));
  }

  #printAfterTotalPrice(reservationDate) {
    const totalPrice = this.#order.getBeforeTotalAmount();
    const afterTotalPrice = this.#benefit.circulateAfterTotal(
      reservationDate,
      totalPrice,
    );

    this.#outputView.printAfterTotal(formatPrice(afterTotalPrice));
  }

  #printEventBadge() {
    const totalBenefit = this.#calculateTotalBenefit();
    const eventBadge = this.#badge.eventBadge(totalBenefit);
    this.#outputView.printBadge(eventBadge);
  }
}

export default Controller;
