import { css } from './index';

export const button = css`
  color: ${p => p.theme.textColor};
  border: none;
  outline: none;
  font-size: 15px;
  padding: 9px 11px;
  border-radius: 4px;
  cursor: pointer;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  &:hover {
    color: #000;
  }
`;

export const iconButton = css`
  display: flex;
  align-items: center;

  .icon-left {
    height: 24px;
    width: 24px;
    margin: -4px 4px -4px -8px;
  }
`;

export const buttonPrimary = css`
  ${button};
  background: ${p => p.theme.colors.brand.primary};
  color: #fff;

  &:hover {
    color: #fff;
    background: ${p => p.theme.colors.brand.primaryLight};
  }
`;
