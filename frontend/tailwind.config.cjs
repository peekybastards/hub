const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      fontFamily: {
        arvo: ["Bitline", "sans-serif"],
        markovaldo: ["Marcovaldo Trial", "sans-serif"],
        cathedral: ["Cathedral", "sans-serif"]
      }
    },
  },

  plugins: [
  ],
};

module.exports = config;
