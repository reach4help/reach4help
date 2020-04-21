import { MenuItem } from './menu-item';

export interface Module {
  path: string;
  protected?: boolean;
  component: ReactElement;
  layout?: string;
  menuLinks?: Array<MenuItem>;
}
