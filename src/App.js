import Controller from './controller/Controller';
import InputView from './views/InputView';
import OutputView from './views/OutputView';
import { MENU_BOARD } from './constants/menuBoard';
import Order from './model/Order';
import Benefit from './model/Benefit';
import Badge from './model/Badge';

class App {
  #order;
  #benefit;
  #badge;
  #controller;

  constructor() {
    this.#order = new Order(MENU_BOARD);
    this.#benefit = new Benefit();
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
