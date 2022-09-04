class ButtonComponent extends HTMLElement {
  shadow: ShadowRoot;
  text: string;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.text = this.getAttribute("text") || "";
  }
  connectedCallback() {
    this.render();
  }
  render() {
    const style = document.createElement("style");
    style.innerHTML = `
      .button {
        font-family:'Odibee Sans', cursive;
        height:84px;
        width:368px;
        margin-top: 20px;
        background-color: var(--azul-claro);
        border: solid 5px var(--azul-oscuro);
        color: #eee;
        font-size: 45px;
      }
    `;
    this.shadow.innerHTML = `
      <button class="button" >
        ${this.text}
      </button>
    `;
    this.shadow.appendChild(style);
  }
}

customElements.define("btn-component", ButtonComponent);
