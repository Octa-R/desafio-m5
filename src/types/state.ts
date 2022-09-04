import { Storage } from "./storage";
export interface State {
  data: {};
  listeners: ((arg0: any) => any)[];
  storage: Storage;

  init();

  setState: (state: { data: {} }) => void;
  getState: () => { data: {} };
  subscribe: (arg0: (data: {}) => any) => any;
}
