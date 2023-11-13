import Controller from './controller/Controller';
import InputView from './views/InputView';
import OutputView from './views/OutputView';

class App {
  #controller;

  constructor() {
    this.#controller = new Controller(InputView, OutputView);
  }

  async run() {
    await this.#controller.startEvent();
  }
}

export default App;
