const template = document.createElement("template");
template.innerHTML = /* HTML */ `
  <style>
    :host {
      --_border-radius: 2.6em;
    }

    :host(.align-right) {
      --quote-margin-inline: auto 0;
      --quote-border-radius: var(--_border-radius) 0em var(--_border-radius) 0em;
    }

    .main-area {
      font-size: var(--default-font-size);
      max-width: 95%;
      margin-inline: var(--quote-margin-inline, 0 auto);
      margin-block: var(--default-margin-block);

      & > blockquote {
        margin: 0;
        color: var(--default-font-color);
        border-radius: var(
          --quote-border-radius,
          0em var(--_border-radius) 0em var(--_border-radius)
        );
        padding: var(--default-block-padding);
        border: var(--default-block-border);
        background-color: var(--default-block-bg-color);

        & > p {
          margin: 0em;
          text-align: center;
        }
        & > p::before {
          content: "📜 ";
        }

        & > div {
          background-color: oklch(var(--color-mid));
          height: 0.1em;
          max-width: 26em;
          margin: 1em auto;
        }

        & > footer {
          font-family: "Special Elite", cursive;
          text-align: right;
          & > cite {
            display: block;
            margin-left: auto;
            margin-bottom: 0.3em;
            max-width: 26em;
          }
          & > cite::before {
            content: "📖  ";
          }
          & > span::before {
            content: "- Conor Dowdall ✍️";
          }
        }
      }
    }
  </style>
  <div class="main-area">
    <blockquote>
      <p>
        <slot name="quote-text"></slot>
      </p>
      <div></div>
      <footer>
        <cite><slot name="source-text"></slot></cite>
        <span></span>
      </footer>
    </blockquote>
  </div>
`;

customElements.define(
  "quote-display",
  class QuoteDisplay extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
  }
);
