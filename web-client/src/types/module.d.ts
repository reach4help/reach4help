import { ProfileState } from 'src/ducks/profile/types';

export interface Module {
  path: string;
  protected?: boolean;
  partiallyProtected?: boolean;
  component: ReactElement;
  layout?: string;
  dynamicMenuLinks?: (profileState?: ProfileState) => Array<MenuItem>;
  menuItems?: Array<MenuItem>;
}
