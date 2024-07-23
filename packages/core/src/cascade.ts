export interface CascadeItem {
  value: string | number,
  isLeaf?: boolean,
  children?: CascadeItem[],
}

export interface CascadeOptions {
  items: CascadeItem[],
}

export class Cascade {
  constructor(options: CascadeOptions) {
    this._items = options.items
  }

  private _items: CascadeItem[]

  active(value: (string | number)[]) {

  }
}
