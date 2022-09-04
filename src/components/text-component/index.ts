class TextComponent extends HTMLElement {
  shadow: ShadowRoot;
  type: string;
  text: string;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.type = this.getAttribute("type") || "p";
    this.text = this.getAttribute("text") || "no hay texto";
  }
  connectedCallback() {
    this.render();
  }
  render() {
    const style = document.createElement("style");
    style.innerHTML = `
      .text {
        margin:0 auto;
        text-align: center;
        font-family: 'Courier Prime', monospace;
        max-width:284px;
      }

      .title {
        color:var(--verde-oscuro);
        font-size:80px;
      }

      .p {
        color:var(--negro);
      }
    `;
    this.shadow.innerHTML = `
      <h2 class="text ${this.type}">
        ${this.text}
      </h2>
    `;
    this.shadow.appendChild(style);
  }
}

customElements.define("text-component", TextComponent);
