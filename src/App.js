import Controller from './controller/Controller';
import InputView from './views/InputView';
import OutputView from './views/OutputView';
import MENU_BOARD from './constants/menuBoard';
import Menu from './model/Menu';

class App {
  #menu;
  #controller;

  constructor() {
    this.#menu = new Menu(MENU_BOARD);
    this.#controller = new Controller(InputView, OutputView, this.#menu);
  }

  async run() {
    await this.#controller.startEvent();
  }
}

export default App;
