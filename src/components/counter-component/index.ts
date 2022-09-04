class CounterComponent extends HTMLElement {
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
    this.shadow.innerHTML = `game`;
    this.shadow.appendChild(style);
  }
}
customElements.define("counter-component", CounterComponent);
