const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { "@base-color": "white"},
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
