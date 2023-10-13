import insultsObject from "./insults.mjs";

const template = document.createElement("template");
template.innerHTML = /* HTML */ `
  <style>
    :host {
      --_image-width: 7.5rem;
      display: block;
      font-size: 1.5rem;
      margin-block: var(--default-margin-block);
      cursor: pointer;
    }

    div {
      position: relative;
      background-color: black;
      border-radius: var(--default-border-radius);
      box-sizing: border-box;
      padding: var(--default-block-padding);
      border: var(--default-block-border);
      width: calc(100% - var(--_image-width));

      & > p {
        font-family: "Gloria Hallelujah", cursive;
        white-space: pre-line;
        color: var(--default-font-color);
      }

      & > img {
        position: absolute;
        right: calc(-0.97 * var(--_image-width));
        bottom: calc(-0.86 * var(--_image-width));
        width: var(--_image-width);
      }

      &:after {
        position: absolute;
        content: "";
        width: 0;
        height: 0;
        border-left: 1em solid black;
        border-right: 1em solid transparent;
        border-top: 2em solid black;
        border-bottom: 2em solid transparent;
        right: -1.6em;
        bottom: -2.3em;
        transform: rotate(-45deg);
      }
    }

    @media (max-width: 58em) {
      :host {
        --_image-width: 4em;
      }

      div {
        width: 100%;
        & > img {
          right: 0;
          bottom: -4em;
        }
        &:after {
          border-left: 0.5em solid black;
          border-right: 0.5em solid transparent;
          border-top: 2em solid black;
          border-bottom: 2em solid transparent;
          right: 3.4em;
          bottom: -2.8em;
        }
      }
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    @keyframes wobble {
      0% {
        transform: rotate(0deg);
      }
      10% {
        transform: rotate(5deg);
      }
      30% {
        transform: rotate(-5deg);
      }
      50% {
        transform: rotate(5deg);
      }
      70% {
        transform: rotate(-5deg);
      }
      90% {
        transform: rotate(5deg);
      }
      100% {
        transform: rotate(0deg);
      }
    }
  </style>

  <div>
    <p data-insult-text>Press here if you agree to be insulted</p>
    <img data-insult-image src="/insult-generator/conor-insult.webp" />
  </div>
`;
customElements.define(
  "insult-generator",
  class InsultGenerator extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(template.content.cloneNode(true));

      this.instultText = this.shadowRoot.querySelector("[data-insult-text]");
      this.instultImage = this.shadowRoot.querySelector("[data-insult-image]");

      this.insultsObjectKeys = [...Object.keys(insultsObject)];
      this.currentObjectKey = this.insultsObjectKeys.shift();
      this.insultsArray = [...insultsObject[this.currentObjectKey]];
      this.addEventListener("click", () => {
        this.setNewInsultText();
      });
    }

    setNewInsultText() {
      this.instultText.style.animation = "fadeIn 0.5s cubic-bezier(1,0,1,-0.1)";
      this.instultText.addEventListener(
        "animationend",
        () => (this.instultText.style.animation = "initial"),
        { once: true }
      );

      this.style.pointerEvents = "none";
      this.instultImage.style.animation = "wobble 0.6s";
      this.instultImage.addEventListener(
        "animationend",
        () => {
          this.style.pointerEvents = "initial";
          this.instultImage.style.animation = "initial";
        },
        { once: true }
      );

      switch (this.currentObjectKey) {
        case "first":
          if (this.insultsArray.length > 0)
            this.instultText.textContent = this.insultsArray
              .sort(() => Math.random() - 0.5)
              .shift();
          else {
            this.currentObjectKey = this.insultsObjectKeys.shift();
            this.insultsArray = [...insultsObject[this.currentObjectKey]];
            this.setNewInsultText();
          }
          break;
        case "last":
          if (this.insultsArray.length > 0)
            this.instultText.textContent = this.insultsArray
              .sort(() => Math.random() - 0.5)
              .shift();
          else {
            this.currentObjectKey = "last";
            this.insultsArray = [...insultsObject[this.currentObjectKey]];
            this.setNewInsultText();
          }
          break;
        default:
          if (this.insultsArray.length > 0)
            this.instultText.textContent = this.insultsArray.shift();
          else {
            this.currentObjectKey = this.insultsObjectKeys.shift();
            this.insultsArray = [...insultsObject[this.currentObjectKey]];
            this.setNewInsultText();
          }
          break;
      }
    }
  }
);
