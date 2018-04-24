export interface ICol {
  type: string;
  name: string;
  display?: string;
  table?: string;
}

export interface ITable {
  display?: string;
  title?: string;
  cols: ICol[];
  rows: any[];
}
