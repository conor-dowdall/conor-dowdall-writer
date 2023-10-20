const template = document.createElement("template");
template.innerHTML = /*html*/ `
  <style>
    :host {
      display: block;
      margin-block: var(--default-margin-block);
      font-size: var(--default-font-size);
      color: var(--default-font-color);
      padding: var(--default-block-padding);
      border: var(--default-block-border);
      border-radius: var(--default-border-radius);
      background-color: var(--default-block-bg-color);
    }
    a {
      display: block;
      text-align: center;
      color: var(--default-link-color);
    }
  </style>
  <p>Hi,</p>
  <p>
    please note that Conor doesn't really even get out of bed for anything less
    than €10,000. So if you absolutely must contact Conor
  </p>
  <a id="abc" target="_blank" rel="noopener noreferrer"></a>
  <p>
    please don't expect a reply unless there are vast amounts of money involved.
    Having said that, lavish praise is usually acceptable too. To be honest,
    faint praise might be nice as well. Things haven't been great lately, y'know
    - even just a quick email to say hello could brighten up my day at this
    point.
  </p>
  <p>
    Really, anything would do - praise, criticism, name-calling, outright hatred
    even. Just to feel something again, y'know? God, it's hard. Life just
    doesn't relent. It keeps on kicking you, and stamping on you, till you can't
    even muster the energy to get up again. Anyway, I love you and maybe you
    could love me too? I hope I'm not being too forward. Just think about it. No
    pressure.
  </p>
  <p>Here's my email again. Stay in touch!</p>
  <a id="def" target="_blank" rel="noopener noreferrer"></a>
  <p>Kind regards,</p>
  <p>Conor.</p>
`;
customElements.define(
  "contact-conor",
  class ContactConor extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(template.content.cloneNode(true));

      const a = "mai";
      const b = "lt";
      const c = "o:";
      const d = "cono";
      const e = "rdowdallmai";
      const f = "l@gma";
      const g = "il.c";
      const h = "om";
      const i = "?";
      const j = "subje";
      const k = "ct=";
      const l = "Conta";
      const m = "ct Conor Dowdall Writer";

      const cdm = d + e + f + g + h;

      const string1 = encodeURI(a + b + c + d + e + f + g + h + i + j + k);
      const string2 = encodeURIComponent(l + m);
      const string3 = string1 + string2;

      const cdm1 = this.shadowRoot.getElementById("abc");
      cdm1.href = string3;
      cdm1.textContent = cdm;

      const cdm2 = this.shadowRoot.getElementById("def");
      cdm2.href = string3;
      cdm2.textContent = cdm;
    }
  }
);
