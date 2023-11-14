import Controller from './controller/Controller';
import InputView from './views/InputView';
import OutputView from './views/OutputView';
import MENU_BOARD from './constants/menuBoard';
import Order from './model/Order';
import Benefit from './model/Benefit';

class App {
  #order;
  #benefit;
  #controller;

  constructor() {
    this.#order = new Order(MENU_BOARD);
    this.#benefit = new Benefit();
    this.#controller = new Controller(
      InputView,
      OutputView,
      this.#order,
      this.#benefit,
    );
  }

  async run() {
    await this.#controller.startEvent();
  }
}

export default App;
