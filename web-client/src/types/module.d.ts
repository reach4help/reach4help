export interface Module {
  path: string;
  protected?: boolean;
  component: ReactElement;
}
