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

  .icon {
    height: 24px;
    width: 24px;
    margin: -4px -4px;

    &.icon-start,
    [dir='rtl'] &.icon-end {
      margin-left: -8px;
      margin-right: 4px;
    }

    &.icon-end,
    [dir='rtl'] &.icon-start {
      margin-left: 4px;
      margin-right: -8px;
    }
  }
`;

export const iconButtonSmall = css`
  ${iconButton}

  .icon {
    height: 18px;
    width: 18px;
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
