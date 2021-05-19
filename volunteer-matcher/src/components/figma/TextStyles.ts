/* Common font styles used by Figma */
/* Note:  These aren't exact copies of figma styles or rather there is some inconsistency in figma right now. 
for now all Header Fonts are     color: rgba(0, 0, 0, 0.85);
*/

import styled from 'styled-components';

const H1Font = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 44px;
  line-height: 173%;
  color: rgba(0, 0, 0, 0.85);
`;

const H2Font = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 38px;
  line-height: 121%;
  color: rgba(0, 0, 0, 0.85);
`;

const H3Font = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 30px;
  line-height: 120%;
  color: rgba(0, 0, 0, 0.85);
`;

const H4Font = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 133%;
  color: rgba(0, 0, 0, 0.85);
`;

const H5Font = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 140%;
  color: rgba(0, 0, 0, 0.85);
`;

const H6Font = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 144%;
  color: rgba(0, 0, 0, 0.85);
`;

const FontSizeLg = styled.span`
  /* font-size-lg */

  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  /* identical to box height, or 150% */

  color: #c4c4c4;
`;

const FontSizeBase = styled.div`
  /* font-size-base */

  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
  /* identical to box height, or 157% */

  color: #c4c4c4;
`;

const FontSizeSm = styled.span`
  /* font-size-sm */
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 20px;
  /* identical to box height, or 167% */

  color: #c4c4c4;
`;

export {
  H1Font,
  H2Font,
  H3Font,
  H4Font,
  H5Font,
  H6Font,
  FontSizeLg,
  FontSizeSm,
  FontSizeBase,
};
