import Validator from '../validator/Validator';

class Controller {
  #inputView;
  #outputView;

  constructor(inputView, outputView) {
    this.#inputView = inputView;
    this.#outputView = outputView;
  }

  async startEvent() {
    this.#printGreetingMessage();
    await this.#readReservationDate();
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
}

export default Controller;
