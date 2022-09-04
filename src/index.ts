import { initRouter } from "./router";
import "./components/btn-component";
import "./components/counter-component";
import "./components/hand-component";
import "./components/score-component";
import "./components/text-component";
(() => {
  const root = <HTMLElement>document.querySelector(".root");
  initRouter(root);
})();
