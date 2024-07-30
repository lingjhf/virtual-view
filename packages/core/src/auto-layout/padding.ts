export class Padding {
  constructor(options: { left?: number, top?: number, bottom?: number, right?: number, }) {
    this.left = options.left ?? 0
    this.top = options.top ?? 0
    this.bottom = options.bottom ?? 0
    this.right = options.right ?? 0
  }

  left: number
  top: number
  bottom: number
  right: number
}
