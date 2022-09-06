import { initRouter } from "./router";
import "./components/btn-component";
import "./components/counter-component";
import "./components/hand-component";
import "./components/score-component";
import "./components/text-component";
import "./components/score-component";
import "./components/star-component";
import { state } from "./state";

(() => {
  state.init();
  const root = <HTMLElement>document.querySelector(".root");
  initRouter(root);
  state.resetResults();
  // console.log(state.getComputerScore(), state.getPlayerScore());
  // state.move("papel");
  // console.log("pc", state.getComputerScore(), "player", state.getPlayerScore());
  // state.move("papel");
  // console.log("pc", state.getComputerScore(), "player", state.getPlayerScore());
})();
