class CounterComponent extends HTMLElement {
  shadow: ShadowRoot;
  count: number;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.count = Number(this.getAttribute("count") || 3);
  }
  connectedCallback() {
    console.log(this.count);
    setTimeout(() => {
      const loading = this.shadow.querySelector(".loading");
      // ?.style.display = "none";
      loading?.classList.add("hide");
    }, this.count * 1100);
    this.render();
  }
  render() {
    const style = document.createElement("style");
    style.innerHTML = `
      .loading {
        display:flex;
        justify-content: center;
      }
      .hide {
        display:none;
      }
      .loading::after {
        content: "";
        width: 240px;
        height: 240px;
        border: 20px solid #ddd;
        border-top-color: #000;
        border-radius: 50%;
        animation: loading 1s ease-in-out ;
        animation-iteration-count: ${this.count};
      }
      @keyframes loading {
        to {
          transform:rotate(1turn);
        }
      }
    `;
    this.shadow.innerHTML = `<div class="loading"></div>`;
    this.shadow.appendChild(style);
  }
}
customElements.define("counter-component", CounterComponent);
