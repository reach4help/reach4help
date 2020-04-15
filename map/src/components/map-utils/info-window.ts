import { IMarker } from 'src/data/markers';

import { escapeHtml } from './escape';

export default (info: IMarker) =>
  `<div class="info-window">${escapeHtml(info.contentTitle)}</div>`;
