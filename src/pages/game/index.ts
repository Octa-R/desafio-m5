export function initGamePage({ goTo }) {
  class GamePage extends HTMLElement {
    shadow: ShadowRoot;
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
    }
    connectedCallback() {
      this.render();
    }
    render() {
      this.shadow.innerHTML = `game`;
    }
  }

  customElements.define("game-page", GamePage);
  const page = document.createElement("game-page");
  return page;
}
