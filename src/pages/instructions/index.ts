export function initInstructionsPage({ goTo }) {
  class InstructionsPage extends HTMLElement {
    shadow: ShadowRoot;
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
    }
    connectedCallback() {
      this.render();
    }
    render() {
      this.shadow.innerHTML = `instructions`;
    }
  }

  customElements.define("instructions-page", InstructionsPage);
  const page = document.createElement("instructions-page");
  return page;
}
