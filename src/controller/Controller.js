import Validator from '../validator/Validator';
import formatPrice from '../utils/formatPrice';

class Controller {
  #inputView;
  #outputView;
  #order;
  #benefit;
  #badge;

  #reservationDate;
  #orderedMenus;
  #giveawayMenu;
  #totalPrice;

  constructor(inputView, outputView, order, benefit, badge) {
    this.#inputView = inputView;
    this.#outputView = outputView;
    this.#order = order;
    this.#benefit = benefit;
    this.#badge = badge;
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
    this.#printTotalBenefit();
    this.#printAfterTotalPrice();
    this.#printEventBadge();
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
      const order = await this.#inputView.readOrder();
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
    this.#totalPrice = totalPrice;
    const formatTotalPrice = formatPrice(totalPrice);
    this.#outputView.printBeforeTotal(formatTotalPrice);
  }

  #printGivewayMenu() {
    const giveawayMenu = this.#order.getGiveawayMenu();
    this.#giveawayMenu = giveawayMenu;
    this.#outputView.printGiveaway(giveawayMenu);
  }

  #applyChristmasDiscount() {
    const discount = this.#benefit.christmasDiscount(
      this.#reservationDate,
      this.#totalPrice,
    );

    if (!discount) return false;

    this.#outputView.printChristmasEvent(formatPrice(discount));
    return true;
  }

  #applyWeekendDiscount() {
    const discount = this.#benefit.weekendDiscount(
      this.#reservationDate,
      this.#orderedMenus,
      this.#totalPrice,
    );

    if (!discount) return false;

    this.#outputView.printWeekendEvent(formatPrice(discount));
    return true;
  }

  #applyWeekdayDiscount() {
    const discount = this.#benefit.weekdayDiscount(
      this.#reservationDate,
      this.#orderedMenus,
      this.#totalPrice,
    );

    if (!discount) return false;

    this.#outputView.printWeekdayEvent(formatPrice(discount));
    return true;
  }

  #applySpecialDiscount() {
    const discount = this.#benefit.specialDiscount(
      this.#reservationDate,
      this.#totalPrice,
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

  #printTotalBenefit() {
    const totalBenefit = this.#benefit.circulateBenefit(
      this.#reservationDate,
      this.#orderedMenus,
      this.#totalPrice,
      this.#giveawayMenu,
    );

    this.#outputView.printBenefit(formatPrice(totalBenefit));
  }

  #printAfterTotalPrice() {
    const totalPrice = this.#benefit.circulateAfterTotal(
      this.#reservationDate,
      this.#orderedMenus,
      this.#totalPrice,
    );

    this.#outputView.printAfterTotal(formatPrice(totalPrice));
  }

  #printEventBadge() {
    const totalBenefit = this.#benefit.circulateBenefit(
      this.#reservationDate,
      this.#orderedMenus,
      this.#totalPrice,
      this.#giveawayMenu,
    );

    const eventBadge = this.#badge.eventBadge(totalBenefit);
    this.#outputView.printBadge(eventBadge);
  }
}

export default Controller;
