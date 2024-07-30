import { Padding } from './padding'
import { FrameAlign } from './align'
import { Container, type ContainerOptions } from './container'

export interface FrameOptions extends ContainerOptions {
  align?: FrameAlign,
  padding?: Padding,
}

export abstract class Frame extends Container {
  constructor(options: FrameOptions) {
    super(options)
    this._align = options.align ?? FrameAlign.topLeft
    this._padding = options.padding ?? new Padding({})
  }

  protected _align: FrameAlign

  protected _padding: Padding

  get align() {
    return this._align
  }

  set align(value: FrameAlign) {
    this._align = value
  }

  get padding() {
    return this._padding
  }

  abstract layout(): this

  setAlign(value: number): this {
    this._align = value
    return this
  }

  setPadding(value: Partial<Padding>): this {
    this._padding.left = value.left ?? this._padding.left
    this._padding.right = value.right ?? this._padding.right
    this._padding.top = value.top ?? this._padding.top
    this._padding.bottom = value.bottom ?? this._padding.bottom
    return this
  }
}
