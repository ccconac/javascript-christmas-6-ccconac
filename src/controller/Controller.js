class Controller {
  #outputView;

  constructor(outputView) {
    this.#outputView = outputView;
  }

  async startEvent() {
    this.#printGreetingMessage();
  }

  #printGreetingMessage() {
    this.#outputView.printStartMessage();
  }
}

export default Controller;
