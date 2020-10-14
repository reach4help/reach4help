import { ProfileState } from 'src/ducks/profile/types';

export interface MenuItem {
  id: string;
  icon?: React.FunctionComponent<{}> | React.ComponentClass<{}, any>;
  title: string;
  showWhenLogggedOn?: boolean;
  showWhenNotLogggedOn?: boolean;
  children?: Array<MenuItem>;
  location?: { path: string };
  functionToExecute?: { path: string };
}
export interface Module {
  path: string;
  protected?: boolean;
  partiallyProtected?: boolean;
  component: ReactElement;
  layout?: string;
  dynamicMenuLinks?: (profileState?: ProfileState) => Array<MenuItem>;
  menuItems?: Array<MenuItem>;
}
