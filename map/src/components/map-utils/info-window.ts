import { MarkerInfo } from 'src/data/firebase';

import { escapeHtml } from './escape';

export default (info: MarkerInfo) =>
  `<div class="info-window">${escapeHtml(info.contentTitle)}</div>`;
