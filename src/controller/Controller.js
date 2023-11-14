import Validator from '../validator/Validator';

class Controller {
  #inputView;
  #outputView;
  #menu;
  #reservationDate;

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
        return orderedMenus;
      } catch ({ message }) {
        this.#outputView.printErrorMessage(message);
      }
    }
  }

  #printPreviewMessage() {
    this.#outputView.printPreview(this.#reservationDate);
  }
}

export default Controller;
