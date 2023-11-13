import Controller from './controller/Controller';
import OutputView from './views/OutputView';

class App {
  #controller;

  constructor() {
    this.#controller = new Controller(OutputView);
  }

  async run() {
    await this.#controller.startEvent();
  }
}

export default App;
