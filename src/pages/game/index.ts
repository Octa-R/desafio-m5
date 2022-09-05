const imageURL = require("url:../../img/fondo.png");
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

    addListeners() {
      const handList = this.shadow.querySelectorAll("hand-component");
      handList.forEach((item) => {
        item.addEventListener("player-move", (e) => {
          const { detail } = e as any;
          console.log(detail.move);
        });
      });
      console.log("se agrego listener a hands");
    }

    render() {
      const style = document.createElement("style");
      style.innerHTML = `
        .main {
          box-sizing:border-box;
          height:100vh;
          background-color: #eee;
          background-image: url("${imageURL}");
          padding:100px 25px;
          display:flex;
          flex-direction:column;
          align-items:center;
          justify-content: space-between;
        }
        .hands-container {
          height:50px;
          width:50px;
        }
      `;

      this.shadow.innerHTML = `
        <main class="main">
          <counter-component count="3"></counter-component>
          <div class="hands-container">
            <hand-component size="md" type="tijera" ></hand-component>
            <hand-component size="md" type="piedra" ></hand-component>
            <hand-component size="md" type="papel" ></hand-component>
          </div>
        </main>
      `;
      this.addListeners();
      this.shadow.appendChild(style);
    }
  }

  customElements.define("game-page", GamePage);
  const page = document.createElement("game-page");
  return page;
}
