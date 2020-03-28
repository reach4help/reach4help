/* eslint-disable @typescript-eslint/no-var-requires */
const { override, fixBabelImports, addLessLoader } = require('customize-cra');

const { COLORS } = require('./src/theme/colors');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      '@primary-color': COLORS.primary,
      '@link-color': COLORS.link,
      '@highlight-color': COLORS.highlight,
      'hack': `true;@import "${require.resolve('./src/theme/themeOverrides.less')}";`,
    },
  }),
);
