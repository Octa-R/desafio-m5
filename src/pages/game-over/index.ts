import { state } from "../../state";
const imageURL = require("url:../../img/fondo.png");

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
      const style = document.createElement("style");
      style.innerHTML = `
        .main {
          box-sizing:border-box;
          height:100vh;
          background-color: #eee;
          background-image: url("${imageURL}");
          padding:50px 25px;
          display:flex;
          flex-direction:column;
          align-items:center;
          justify-content: space-between;
        }
      `;
      this.shadow.innerHTML = `
        <main class="main">
          <star-component type="lost"></star-component>
          <score-component player="3" computer="2"></score-component>
          <btn-component text="Volver a Jugar"></btn-component>
        </main>
      `;
      this.shadow.appendChild(style);
    }
  }

  customElements.define("game-over", ResultsPage);
}
