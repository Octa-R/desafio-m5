const papelImg = require("url:./papel.svg");
const piedraImg = require("url:./piedra.svg");
const tijerasImg = require("url:./tijera.svg");
class HandComponent extends HTMLElement {
  shadow: ShadowRoot;
  type: string;
  imgUrl: string;
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
  }
  connectedCallback() {
    this.render();
  }
  render() {
    const style = document.createElement("style");
    style.innerHTML = `
      .piedra{
        background-image: url("${piedraImg}")
      }
      .papel{
        background-image: url("${papelImg}")
      }
      .tijera {
        background-image: url("${tijerasImg}")
      }
    `;
    this.shadow.innerHTML = `<img src="${this.imgUrl}" >`;
    this.shadow.appendChild(style);
  }
}
customElements.define("hand-component", HandComponent);
