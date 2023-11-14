import Controller from './controller/Controller';
import InputView from './views/InputView';
import OutputView from './views/OutputView';
import MENU_BOARD from './constants/menuBoard';
import Order from './model/Order';

class App {
  #order;
  #controller;

  constructor() {
    this.#order = new Order(MENU_BOARD);
    this.#controller = new Controller(InputView, OutputView, this.#order);
  }

  async run() {
    await this.#controller.startEvent();
  }
}

export default App;
