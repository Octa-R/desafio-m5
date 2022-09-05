const papelImg = require("url:./papel.svg");
const piedraImg = require("url:./piedra.svg");
const tijerasImg = require("url:./tijera.svg");
class HandComponent extends HTMLElement {
  shadow: ShadowRoot;
  type: string;
  imgUrl: string;
  size: string;
  sizes = ["sm", "md", "lg"];
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.type = this.getAttribute("type") || "";

    if (this.type === "tijera") {
      this.imgUrl = tijerasImg;
    } else if (this.type === "papel") {
      this.imgUrl = papelImg;
    } else {
      this.imgUrl = piedraImg;
    }
    if (this.sizes.includes(this.getAttribute("size") || "")) {
      this.size = this.getAttribute("size") || "sm";
    }
  }
  connectedCallback() {
    this.render();
  }

  addCustomEvent() {
    const handEl = this.shadow.querySelector(".img");
    handEl?.addEventListener("click", (e) => {
      const event = new CustomEvent("player-move", {
        detail: {
          move: this.type,
        },
      });
      this.dispatchEvent(event);
    });
  }
  render() {
    const style = document.createElement("style");
    style.innerHTML = `
      .sm {
        width:57px;
      }

      .sm.papel {
        width:67px;
      }

      .md {
        width:100px;
      }

      .md.papel {
        width:115px;
      }

      .lg {
        width:150px;
      }

      .lg.papel {
        width:160px;
      }

      .img {
        position: fixed;
        bottom:-30px;
        cursor:pointer;
      }
      .piedra{
        left: 50%;
        transform: translate(-50%, 0);
      }

      .papel{
        left: 50%;
        transform: translate(50%, 0);
      }
      
      .tijera {
        left: 50%;
        transform: translate(-160%, 0);
      }
    `;
    this.shadow.innerHTML = `
      <img 
        class="img ${this.type} ${this.size}"
        src="${this.imgUrl}"
      >
    `;
    this.addCustomEvent();
    this.shadow.appendChild(style);
  }
}
customElements.define("hand-component", HandComponent);
