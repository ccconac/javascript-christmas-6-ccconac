import Controller from './controller/Controller';
import InputView from './views/InputView';
import OutputView from './views/OutputView';
import Order from './model/Order';
import Benefit from './model/Benefit';
import Badge from './model/Badge';

class App {
  #order;

  #benefit;

  #badge;

  #controller;

  constructor() {
    this.#order = new Order();
    this.#benefit = new Benefit(this.#order);
    this.#badge = new Badge();

    this.#controller = new Controller(
      InputView,
      OutputView,
      this.#order,
      this.#benefit,
      this.#badge,
    );
  }

  async run() {
    await this.#controller.startEvent();
  }
}

export default App;
