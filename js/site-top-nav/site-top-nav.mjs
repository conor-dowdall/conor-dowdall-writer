const template = document.createElement("template");
template.innerHTML = /*html*/ `
  <style>
    .sr-only {
      clip: rect(0 0 0 0);
      clip-path: inset(50%);
      height: 1px;
      overflow: hidden;
      position: absolute;
      white-space: nowrap;
      width: 1px;
    }

    #site-top-nav {
      font-size: 1.5rem;
      --_height: 4em;
      height: var(--_height);
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.2em 1em;
      position: relative;

      & > #logo {
        height: var(--_height);
        & > img {
          opacity: 0.85;
          height: 100%;
        }
      }

      & > #toggle-menu-button {
        display: none;
      }

      & > #menu-list {
        display: flex;
        list-style: none;
        padding: 0;
        gap: 0.5em;
        transition: transform 350ms linear;

        & > li {
          background-size: 1.5em;
          background-repeat: no-repeat;
          background-image: url("/conor-dowdall-writer/site-top-nav/schreib-feder.svg");
          transition: background-size 350ms, background-position-x 350ms;

          & > a {
            color: white;
            padding: 0.5em 0.4em;
            text-shadow: var(--text-shadow-primary-dark);
            text-decoration: none;
            transition: text-shadow 350ms ease-out;
          }
        }

        & > li:is(:hover, :focus-within, :active) {
          background-size: 1.7em;
          background-position-x: 5%;

          & > a {
            text-shadow: var(--text-shadow-primary);
          }
        }
      }
    }
    @media (max-width: 58em) {
      #site-top-nav {
        font-size: 1.8rem;

        & > #toggle-menu-button {
          display: block;
          position: absolute;
          top: 2.5em;
          right: 2.5em;
          border-radius: 0.8em;
          border: 0.1em solid black;
          z-index: 9999;
          background-color: rgb(255 255 255 / 0.4);
          background-repeat: no-repeat;
          background-image: url("/conor-dowdall-writer/site-top-nav/menu-open-icon.svg");
          background-position: center;
          background-size: 85%;
          height: 5em;
          width: 5em;
          box-shadow: 0.15em 0.15em 0.15em black;
          transition: transform 40ms, box-shadow 40ms;
        }

        & > #toggle-menu-button[aria-expanded="true"] {
          background-image: url("/conor-dowdall-writer/site-top-nav/menu-close-icon.svg");
          background-size: 55%;
        }

        & > #toggle-menu-button:active {
          transform: translateX(0.03em) translateY(0.03em);
          box-shadow: 0.03em 0.03em 0.045em black;
        }

        & > #menu-list {
          position: fixed;
          gap: 1em;
          flex-direction: column;
          justify-content: start;
          align-items: center;
          inset: 0;
          padding-block: 4em;
          margin: 0;
          background-color: rgb(255 255 255 / 0.2);
          z-index: 8888;
          overflow: auto;
          backdrop-filter: blur(0.9rem) brightness(60%);
          transform: translateX(100%);
        }

        & > #menu-list[data-visible="true"] {
          transform: translateX(0%);
        }
      }
    }
  </style>
  <nav id="site-top-nav">
    <a id="logo" href="/conor-dowdall-writer/index.html">
      <img
        src="/conor-dowdall-writer/site-top-nav/ink-feather.svg"
        alt="logo with feather pen in ink pot"
      />
    </a>
    <button
      type="button"
      id="toggle-menu-button"
      aria-controls="menu-list"
      aria-label="toggle the menu"
      aria-expanded="false"
    >
      <span class="sr-only">Menu</span>
    </button>
    <ul id="menu-list" data-visible="false" aria-label="menu">
      <li>
        <a href="/conor-dowdall-writer/html/quotes.html">Quotes</a>
      </li>
      <li>
        <a href="/conor-dowdall-writer/html/writing.html">Writing</a>
      </li>
      <li>
        <a href="/conor-dowdall-writer/html/speaking.html">Speaking</a>
      </li>
      <li>
        <a href="/conor-dowdall-writer/html/insults.html">Insults</a>
      </li>
      <li>
        <a href="/conor-dowdall-writer/html/contact.html">Contact</a>
      </li>
    </ul>
  </nav>
`;

customElements.define(
  "site-top-nav",
  class SiteTopNav extends HTMLElement {
    constructor() {
      super();
    }
    connectedCallback() {
      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(template.content.cloneNode(true));

      const menuList = this.shadowRoot.querySelector("#menu-list");
      const toggleMenuButton = this.shadowRoot.querySelector(
        "#toggle-menu-button"
      );

      toggleMenuButton.addEventListener("click", () => {
        const isMenuVisible = menuList.getAttribute("data-visible") === "true";
        if (isMenuVisible) {
          document.body.style.overflow = "initial";
          menuList.setAttribute("data-visible", "false");
          toggleMenuButton.setAttribute("aria-expanded", "false");
        } else {
          document.body.style.overflow = "hidden";
          menuList.setAttribute("data-visible", "true");
          toggleMenuButton.setAttribute("aria-expanded", "true");
        }
      });
    }
  }
);
