import { Frame } from './frame'

export abstract class Flex extends Frame {
  protected _gap = 0

  get gap() {
    return this._gap
  }

  setGap(value: number): this {
    this._gap = value
    return this
  }
}
