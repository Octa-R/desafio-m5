import { state } from "../../state";

export function initGameOverPage({ goTo }) {
  class ResultsPage extends HTMLElement {
    shadow: ShadowRoot;
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
    }
    connectedCallback() {
      this.render();
    }
    render() {
      this.shadow.innerHTML = `results`;
    }
  }

  customElements.define("game-over", ResultsPage);
  const page = document.createElement("game-over");
  return page;
}
