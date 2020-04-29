export interface Module {
  path: string;
  protected?: boolean;
  component: ReactElement;
  layout?: string;
  menuItems?: Array<MenuItem>;
}
