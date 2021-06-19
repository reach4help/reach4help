import { MarkerInfoType } from 'src/data/dataDriver';

import { escapeHtml } from './escape';

export default (info: MarkerInfoType) =>
  `<div class="info-window">${escapeHtml(info.contentTitle)}</div>`;
