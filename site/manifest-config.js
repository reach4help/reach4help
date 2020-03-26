const colors = require('./colors');

module.exports = {
  name: 'Reach4Help',
  short_name: 'Reach4Help',
  start_url: '/',
  background_color: colors.background,
  theme_color: colors.primary,
  display: 'minimal-ui',
  icons: [
    {
      src: 'media/favicon.ico',
      sizes: '64x64 48x48 32x32 24x24 16x16',
      type: 'image/x-icon',
    },
    {
      src: 'media/logo128.png',
      type: 'image/png',
      sizes: '128x128',
    },
    {
      src: 'media/logo192.png',
      type: 'image/png',
      sizes: '192x192',
    },
    {
      src: 'media/logo512.png',
      type: 'image/png',
      sizes: '512x512',
    },
  ],
};
