class ScoreComponent extends HTMLElement {
  shadow: ShadowRoot;
  type: string;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.type = this.getAttribute("type") || "p";
  }
  connectedCallback() {
    this.render();
  }
  render() {
    const style = document.createElement("style");
    style.innerHTML = `
      .title {
        color:var(--verde);
      }

      .p {
        color:var(--negro);
      }
    `;
    this.shadow.innerHTML = `game`;
    this.shadow.appendChild(style);
  }
}

customElements.define("score-component", ScoreComponent);
