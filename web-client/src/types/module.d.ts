export interface MenuItem {
  id: string;
  icon?: React.FunctionComponent<{}> | React.ComponentClass<{}, any>;
  title: string;
  children?: Array<MenuItem>;
  location?: { path: string };
}
export interface Module {
  path: string;
  protected?: boolean;
  component: ReactElement;
  layout?: string;
  menuItems?: Array<MenuItem>;
}
