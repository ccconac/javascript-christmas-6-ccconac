import Validator from '../validator/Validator';

class Controller {
  #inputView;
  #outputView;
  #menu;

  constructor(inputView, outputView, menu) {
    this.#inputView = inputView;
    this.#outputView = outputView;
    this.#menu = menu;
  }

  async startEvent() {
    this.#printGreetingMessage();
    await this.#readReservationDate();
    await this.#readMenus();
  }

  #printGreetingMessage() {
    this.#outputView.printStartMessage();
  }

  async #readReservationDate() {
    while (true) {
      const reservationDate = await this.#inputView.readDate();
      try {
        Validator.dateValidator(reservationDate);
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
}

export default Controller;
