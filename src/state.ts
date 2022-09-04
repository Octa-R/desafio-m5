import { Storage } from "./types/storage";
import { State } from "./types/state";

export const state: State = {
  data: {},
  listeners: [],
  storage: new Storage(),
  init() {
    const data = this.storage.getItem("saved-state");
    this.setState({ data });
  },
  setState(state) {
    this.data = this.storage.getItem("saved-state");
  },
  getState() {
    return this.data;
  },
  subscribe() {},
};
