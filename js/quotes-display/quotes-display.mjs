import quotesArray from "./quotes.mjs";
import "./quote-display.mjs";

const template = document.createElement("template");
template.innerHTML = /*html*/ ` <div class="main-area"></div> `;
customElements.define(
  "quotes-display",
  class QuotesDisplay extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(template.content.cloneNode(true));

      const mainArea = this.shadowRoot.querySelector(".main-area");

      quotesArray.forEach((quoteObject, index) => {
        const quoteDisplay = document.createElement("quote-display");
        if ((index + 1) % 2 === 0) quoteDisplay.classList.add("align-right");

        const quoteTextSlot = document.createElement("span");
        quoteTextSlot.setAttribute("slot", "quote-text");
        quoteTextSlot.textContent = quoteObject.quote;
        quoteDisplay.append(quoteTextSlot);

        const sourceTextSlot = document.createElement("span");
        sourceTextSlot.setAttribute("slot", "source-text");
        sourceTextSlot.textContent = quoteObject.source;
        quoteDisplay.append(sourceTextSlot);

        mainArea.append(quoteDisplay);
      });
    }
  }
);
