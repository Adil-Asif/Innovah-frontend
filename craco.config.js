const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { 
                '@primary-color': '#5C7AEA',
                '@layout-body-background': '#f2f2f2',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};