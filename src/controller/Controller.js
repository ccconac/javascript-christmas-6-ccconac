import Validator from '../validator/Validator';
import formatPrice from '../utils/formatPrice';

class Controller {
  #inputView;
  #outputView;
  #menu;

  #reservationDate;
  #orderedMenus;

  constructor(inputView, outputView, menu) {
    this.#inputView = inputView;
    this.#outputView = outputView;
    this.#menu = menu;
  }

  async startEvent() {
    this.#printGreetingMessage();
    await this.#readReservationDate();
    await this.#readMenus();
    this.#printPreviewMessage();
    this.#printOrderList();
    this.#printBeforeTotalPrice();
    this.#printGivewayMenu();
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
        const orderedMenus = this.#menu.getOrderedMenus(order);
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
    const totalPrice = this.#menu.circulateBeforeTotal();
    const formatTotalPrice = formatPrice(totalPrice);
    this.#outputView.printBeforeTotal(formatTotalPrice);
  }

  #printGivewayMenu() {
    const giveawayMenu = this.#menu.getGiveawayMenu();
    this.#outputView.printGiveaway(giveawayMenu);
  }
}

export default Controller;
