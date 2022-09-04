class ButtonComponent extends HTMLElement {
  shadow: ShadowRoot;
  text: string;
  listener: () => any;
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
        background-color: var(--azul-claro);
        border: 10px solid var(--azul-oscuro);
        border-radius: 10px;
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
