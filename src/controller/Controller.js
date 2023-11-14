import Validator from '../validator/Validator';
import formatPrice from '../utils/formatPrice';

class Controller {
  #inputView;
  #outputView;
  #order;
  #benefit;

  #reservationDate;
  #orderedMenus;
  #giveawayMenu;

  constructor(inputView, outputView, order, benefit) {
    this.#inputView = inputView;
    this.#outputView = outputView;
    this.#order = order;
    this.#benefit = benefit;
  }

  async startEvent() {
    this.#printGreetingMessage();
    await this.#readReservationDate();
    await this.#readMenus();
    this.#printPreviewMessage();
    this.#printOrderList();
    this.#printBeforeTotalPrice();
    this.#printGivewayMenu();
    this.#printBenefits();
  }

  #printGreetingMessage() {
    this.#outputView.printGreeting();
  }

  async #readReservationDate() {
    while (true) {
      const reservationDate = await this.#inputView.readDate();
      try {
        Validator.dateValidator(reservationDate);
        this.#reservationDate = reservationDate;
        return reservationDate;
      } catch ({ message }) {
        this.#outputView.printErrorMessage(message);
      }
    }
  }

  async #readMenus() {
    while (true) {
      const order = await this.#inputView.readMenu();
      try {
        const orderedMenus = this.#order.getOrderedMenus(order);
        this.#orderedMenus = orderedMenus;
        return orderedMenus;
      } catch ({ message }) {
        this.#outputView.printErrorMessage(message);
      }
    }
  }

  #printPreviewMessage() {
    this.#outputView.printPreview(this.#reservationDate);
  }

  #printOrderList() {
    this.#outputView.printMenu(this.#orderedMenus);
  }

  #printBeforeTotalPrice() {
    const totalPrice = this.#order.circulateBeforeTotal();
    const formatTotalPrice = formatPrice(totalPrice);
    this.#outputView.printBeforeTotal(formatTotalPrice);
  }

  #printGivewayMenu() {
    const giveawayMenu = this.#order.getGiveawayMenu();
    this.#giveawayMenu = giveawayMenu;
    this.#outputView.printGiveaway(giveawayMenu);
  }

  #applyChristmasDiscount() {
    const totalPrice = this.#order.circulateBeforeTotal();
    const discount = this.#benefit.christmasDiscount(
      this.#reservationDate,
      totalPrice,
    );

    if (!discount) return false;

    this.#outputView.printChristmasEvent(formatPrice(discount));
    return true;
  }

  #applyWeekendDiscount() {
    const totalPrice = this.#order.circulateBeforeTotal();
    const discount = this.#benefit.weekendDiscount(
      this.#reservationDate,
      this.#orderedMenus,
      totalPrice,
    );

    if (!discount) return false;

    this.#outputView.printWeekendEvent(formatPrice(discount));
    return true;
  }

  #applyWeekdayDiscount() {
    const totalPrice = this.#order.circulateBeforeTotal();
    const discount = this.#benefit.weekdayDiscount(
      this.#reservationDate,
      this.#orderedMenus,
      totalPrice,
    );

    if (!discount) return false;

    this.#outputView.printWeekdayEvent(formatPrice(discount));
    return true;
  }

  #applySpecialDiscount() {
    const totalPrice = this.#order.circulateBeforeTotal();
    const discount = this.#benefit.specialDiscount(
      this.#reservationDate,
      totalPrice,
    );

    if (!discount) return false;

    this.#outputView.printSpecialEvent(formatPrice(discount));
    return true;
  }

  #applyGiveawayDiscount() {
    const discount = this.#benefit.giveawayEvent(this.#giveawayMenu);

    if (!discount) return false;

    this.#outputView.printGiveawayEvent(formatPrice(discount));
    return true;
  }

  #printBenefits() {
    this.#outputView.printEvent();

    let isNoBenefit = false;

    isNoBenefit = this.#applyChristmasDiscount() || isNoBenefit;
    isNoBenefit = this.#applyWeekendDiscount() || isNoBenefit;
    isNoBenefit = this.#applyWeekdayDiscount() || isNoBenefit;
    isNoBenefit = this.#applySpecialDiscount() || isNoBenefit;
    isNoBenefit = this.#applyGiveawayDiscount() || isNoBenefit;

    if (!isNoBenefit) this.#outputView.printNoBenefit();
  }
}

export default Controller;
