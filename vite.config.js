import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        quotes: resolve(__dirname, "html/quotes.html"),
        writing: resolve(__dirname, "html/writing.html"),
        speaking: resolve(__dirname, "html/speaking.html"),
        insults: resolve(__dirname, "html/insults.html"),
        contact: resolve(__dirname, "html/contact.html"),
      },
    },
  },
  base: "/conor-dowdall-writer/",
});
