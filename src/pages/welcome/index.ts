import { state } from "../../state";
const imageURL = require("url:../../img/fondo.png");
export function initWelcomePage({ goTo }) {
  class WelcomePage extends HTMLElement {
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
      this.shadow.innerHTML = `
        <main class="main">
          <text-component type="title" text="Piedra Papel o Tijera"></text-component>
          <btn-component text="Empezar"></btn-component>
          <div class="hands-container">
            <hand-component type="tijera" ></hand-component>
            <hand-component type="piedra" ></hand-component>
            <hand-component type="papel" ></hand-component>
          </div>
        </main>
      `;
      style.innerHTML = `
        .main {
          box-sizing:border-box;
          height:100vh;
          background-color: #eee;
          background-image: url("${imageURL}");
          padding:100px 20px;
          display:flex;
          flex-direction:column;
          align-items:center;
          justify-content: space-between;
        }
      `;
      this.shadow.appendChild(style);
    }
  }

  customElements.define("welcome-page", WelcomePage);
  const page = document.createElement("welcome-page");
  return page;
}
