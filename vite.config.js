import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/conor-dowdall-writer/",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        quotes: resolve(__dirname, "quotes.html"),
        writing: resolve(__dirname, "writing.html"),
        speaking: resolve(__dirname, "speaking.html"),
        insults: resolve(__dirname, "insults.html"),
        contact: resolve(__dirname, "contact.html"),
      },
    },
  },
});
