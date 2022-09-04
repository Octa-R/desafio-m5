export class Storage {
  save(key: string, data: {}) {
    localStorage.setItem(key, JSON.stringify(data));
  }
  get(key): { data: {} } {
    const data = localStorage.getItem(key);
    if (data) {
      return JSON.parse(data);
    }
    return { data: {} };
  }
}
