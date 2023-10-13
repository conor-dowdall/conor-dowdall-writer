const template = document.createElement("template");
template.innerHTML = /* HTML */ `
  <style>
    :host {
      --width: 12rem;
      --height: calc(var(--width) * 1.3);
      --page-rotate-duration: 300ms;
      --translateZ-duration: 600ms;
    }

    .main-area {
      position: relative;
      transform-style: preserve-3d;
      perspective: calc(var(--width) * 5);
      min-width: var(--width);
      height: var(--height);

      & > .details-area {
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        transition: translate var(--translateZ-duration);
        translate: 0px 0px calc(var(--height) * -5);

        & > a {
          width: 100%;
          text-decoration: none;
          text-align: center;
          outline: none;

          & > span {
            display: block;
            font-family: "Courier New", Courier, monospace;
            font-size: calc(var(--width) / 12);
            font-weight: bold;
            color: white;
            border-radius: 0.5em;
            padding: 1em;
            margin-bottom: 0.5em;
            background-color: oklch(var(--color-low));
            &:after {
              content: ".pdf";
            }
          }
          & > img {
            display: block;
            margin: 0 auto;
            width: 40%;
            pointer-events: none;
          }
        }
      }

      & > .title-page-area {
        font-family: "Special Elite", cursive;
        position: absolute;
        width: 100%;
        height: 100%;
        transition: translate var(--translateZ-duration),
          transform var(--page-rotate-duration) var(--translateZ-duration);
        translate: 0px 0px 0px;
        transform: rotate3d(1, 1, -0.1, 15deg);

        & > img {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        & > h2 {
          box-sizing: border-box;
          position: absolute;
          width: 100%;
          font-size: calc(var(--width) / 9);
          text-align: center;
          text-wrap: balance;
          margin: 0;
          padding: 20% 7% 0 6%;
          &:after {
            margin-top: 1em;
            display: block;
            font-size: calc(var(--width) / 13);
            content: "by Conor Dowdall";
          }
        }
      }
    }

    .main-area:is(:hover, :focus-within, :active) {
      & > .details-area {
        transition: translate var(--translateZ-duration)
          var(--page-rotate-duration);
        translate: 0px 0px 0px;
      }

      & > .title-page-area {
        transition: transform var(--page-rotate-duration) ease-in,
          translate var(--translateZ-duration) var(--page-rotate-duration);
        transform: translateY(calc(var(--height) * 0.4)) scale(0.7)
          rotate3d(2, 1, -1, 80deg);
        translate: 0px 0px calc(var(--height) * -3);
      }
    }
  </style>

  <div class="main-area">
    <div class="details-area">
      <a data-pdf-link target="_blank">
        <span data-title></span>
        <img
          src="/conor-dowdall-writer/pdf-downloader/PDF_file_icon.svg"
          alt="PDF file icon"
      /></a>
    </div>
    <div class="title-page-area">
      <img
        src="/conor-dowdall-writer/pdf-downloader/paper.webp"
        alt="sheet of paper"
      />
      <h2 data-title></h2>
    </div>
  </div>
`;

customElements.define(
  "pdf-downloader",
  class PDFDownloader extends HTMLElement {
    constructor() {
      super();
    }
    connectedCallback() {
      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(template.content.cloneNode(true));

      const detailsArea = this.shadowRoot.querySelector(".details-area");
      const pdfLink = this.shadowRoot.querySelector("[data-pdf-link]");
      this.addEventListener("mouseover", () => {
        pdfLink.focus();
      });

      const title = this.getAttribute("title");
      this.shadowRoot
        .querySelectorAll("[data-title]")
        .forEach((titleElement) => {
          titleElement.textContent = title;
        });

      const href = this.getAttribute("href");
      pdfLink.setAttribute("href", href);
    }
  }
);
