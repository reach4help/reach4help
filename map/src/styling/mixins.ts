import { css } from './index';

export const button = css`
  color: ${p => p.theme.textColor};
  border: none;
  outline: none;
  font-size: 15px;
  padding: 9px 11px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    color: #000;
  }
`;
