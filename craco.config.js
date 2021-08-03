const CracoLessPlugin = require("craco-less-plugin");
const path = require("path");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessOptions: {
          modifyVars: { "@base-color": "#2c2c32" },
          javascriptEnabled: true,
        },
      },
    },
  ],
  webpack: {
    alias: {
      "@": path.resolve(__dirname),
      node: path.resolve(__dirname, "node_modules"),
      src: path.resolve(__dirname, "src"),
      styles: path.resolve(__dirname, "src/ui/styles"),
      store: path.resolve(__dirname, "src/ui/store"),
      server: path.resolve(__dirname, "src/server"),
      ui: path.resolve(__dirname, "src/ui"),
    },
    extensions: [".js", ".jsx", ".css", ".less", ".tsx", ".ts"],
  },
};
