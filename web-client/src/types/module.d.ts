export interface Module {
  path: string;
  protected?: boolean;
  partiallyProtected?: boolean;
  component: ReactElement;
  layout?: string;
}
