export interface TableFilter {
  name: string;
  model: any;
  eventEmitter: any;

  setValue(name: string, value: any): void;
  setVisibility(visible: boolean): void;
}
