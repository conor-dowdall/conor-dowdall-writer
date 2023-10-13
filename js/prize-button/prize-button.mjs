const template = document.createElement("template");
template.innerHTML = /* HTML */ `
  <style>
    :host {
      display: block;
      margin-block: var(--default-margin-block);
      padding: var(--default-block-padding);
      border: var(--default-block-border);
      border-radius: var(--default-border-radius);
      background-color: var(--default-block-bg-color);
      -webkit-user-select: none; /* Safari */
      -ms-user-select: none; /* IE 10 and IE 11 */
      user-select: none; /* Standard syntax */
    }

    #instructions {
      display: inline;
      color: white;
      text-shadow: var(--text-shadow-secondary);
      font-family: "Special Elite", cursive;
      line-height: 2em;
      border-bottom: 0.12em solid oklch(var(--color-mid));
      padding-bottom: 0.2em;

      font-size: 1.8rem;
      @media (max-width: 58em) {
        font-size: 1.5rem;
      }
    }

    #prize-button-div {
      position: relative;
      width: min-content;
      margin: 0.5em auto;
      text-shadow: var(--text-shadow-primary);

      font-size: 3rem;
      @media (max-width: 58em) {
        font-size: 2rem;
      }

      & > #prize-button {
        cursor: pointer;
        background-image: radial-gradient(
            circle at center top,
            rgb(255 255 255 / 0.4),
            rgb(255 0 0 / 0.4)
          ),
          linear-gradient(
            to bottom,
            rgb(255 0 0),
            rgb(215 0 0),
            rgb(175 0 0),
            rgb(135 0 0)
          );
        font-size: inherit;
        font-weight: bold;
        text-shadow: inherit;
        width: 8em;
        aspect-ratio: 1;
        border-radius: 50%;
        border: solid white 0.1em;
        box-shadow: 0.15em 0.15em 0 rgb(190 180 180),
          0.15em 0.15em 0.6em rgb(170 150 150);
        animation: 0.5s ease-out infinite alternate glowing;
      }

      & > #button-count {
        position: absolute;
        display: block;
        top: 50%;
        left: 50%;
        translate: -50% -50%;
        opacity: 0;
        color: oklch(var(--color-high));
        pointer-events: none;
        -webkit-user-select: none; /* Safari */
        -ms-user-select: none; /* IE 10 and IE 11 */
        user-select: none; /* Standard syntax */
      }
    }

    dialog {
      &:modal {
        box-sizing: border-box;
        max-width: min(95%, 43rem);
        color: white;
        font-size: var(--default-font-size);
        text-align: center;
        padding: var(--default-block-padding);
        border: var(--default-block-border);
        border-width: 1em;
        border-radius: var(--default-border-radius);
        background-color: var(--default-block-bg-color);
      }

      &::backdrop {
        background-color: rgb(0 0 0 / 0.75);
      }

      & > #close-button {
        color: inherit;
        font-weight: bold;
        font-size: inherit;
        padding: 0.5em 2em;
        border-radius: 10000em;
        background-color: transparent;
        &:active {
          background-color: rgb(255 255 255 / 0.5);
        }
      }
    }

    @keyframes glowing {
      from {
        filter: brightness(1);
      }
      to {
        filter: brightness(1.1);
      }
    }

    @keyframes press {
      0% {
        transform: translateY(0em);
      }
      50% {
        transform: translateY(0.1em) translateX(0.1em);
        box-shadow: 0.05em 0.05em 0 rgb(190 180 180),
          0.05em 0.05em 0.2em rgb(170 150 150);
      }
      100% {
        transform: translateY(0em);
      }
    }

    @keyframes ping {
      0% {
        opacity: 1;
      }
      70% {
        opacity: 1;
        top: 15%;
      }
      100% {
        opacity: 0;
        top: 25%;
        left: 60%;
      }
    }
  </style>
  <h2 id="instructions">
    Click <span id="instructions-count">75</span>
    <span id="instructions-time-or-times">Times</span> To Win!
  </h2>
  <div id="prize-button-div">
    <button id="prize-button" type="button">💰 Win! 💰</button>
    <span id="button-count">0</span>
  </div>
  <dialog id="dialog">
    <h1>🤩 Congratulations 🤩</h1>
    <h2>👏 You Have Won 👏</h2>
    <p>🏆 To claim your mystery prize 🎁, simply send your 🏆</p>
    <p>
      <b>👱 name</b>, <b>⏳ age</b>, <b>🌎 address</b>,
      <b>💵 social security number</b>, <b>🏦 bank details</b>,
      <b>💑 mother's maiden name</b> along with a
      <b>😎 short personal bio</b> including any <b>🏠 previous addresses</b>
    </p>
    <p>to Conor's contact details 📧 given on the Contact page.</p>
    <p>
      Again, my heart-felt ❤️ congratulations and sincerest blessings 🙏 to you
      and your family 👪.
    </p>
    <br />
    <button id="close-button" type="button">Close</button>
  </dialog>
`;
customElements.define(
  "prize-button",
  class PrizeButton extends HTMLElement {
    clickGoal = 75;
    clickTotal = 0;
    clickDuration = "0.25s";
    constructor() {
      super();
    }

    connectedCallback() {
      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(template.content.cloneNode(true));

      const prizeButton = this.shadowRoot.getElementById("prize-button");
      const buttonCount = this.shadowRoot.getElementById("button-count");

      const instructionsCount =
        this.shadowRoot.getElementById("instructions-count");
      instructionsCount.textContent = this.clickGoal;

      const instructionsTimeOrTimes = this.shadowRoot.getElementById(
        "instructions-time-or-times"
      );

      const dialog = this.shadowRoot.getElementById("dialog");
      const closeButton = this.shadowRoot.getElementById("close-button");
      closeButton.addEventListener("click", () => {
        dialog.close();
      });

      prizeButton.addEventListener("pointerdown", () => {
        this.clickTotal++;
        prizeButton.style.pointerEvents = "none";
        prizeButton.style.animation = `press ${this.clickDuration} ease-out`;

        instructionsCount.textContent = this.clickGoal - this.clickTotal;

        buttonCount.textContent = this.clickTotal;
        buttonCount.style.animation = `ping ${this.clickDuration} ease-out`;
        buttonCount.addEventListener(
          "animationend",
          () => {
            prizeButton.style.pointerEvents = "initial";
            prizeButton.style.animation = "initial";
            buttonCount.style.animation = "initial";
          },
          { once: true }
        );
        if (this.clickTotal === this.clickGoal - 1) {
          instructionsTimeOrTimes.textContent = "Time";
        }
        if (this.clickTotal >= this.clickGoal) {
          instructionsCount.textContent = "😁";
          buttonCount.textContent = "😁";
          instructionsTimeOrTimes.textContent = "Times";
          this.clickTotal = 0;
          setTimeout(() => {
            dialog.showModal();
            dialog.scrollTop = "0";
            instructionsCount.textContent = this.clickGoal;
          }, 200);
        }
      });
    }
  }
);
