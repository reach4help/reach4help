import { COLORS } from './src/theme/colors';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { override, fixBabelImports, addLessLoader } = require('customize-cra');

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
    },
  }),
);
