import { Padding } from './padding'
import { FrameAlign } from './align'
import EventEmitter from 'eventemitter3'
import { v4 as uuidv4 } from 'uuid'

export interface FrameOptions {
  x?: number,
  y?: number,
  width?: number,
  height?: number,
  align?: FrameAlign,
  padding?: Padding,
  children?: Frame[],
}

export interface FrameEvents {
  resize?: (width: number, height: number) => void,
}

export interface FrameDetail {
  index: number,
  events: FrameEvents,
}

export abstract class Frame extends EventEmitter<FrameEvents> {
  constructor(options: FrameOptions) {
    super()
    this._id = uuidv4()
    this._x = options.x ?? 0
    this._y = options.y ?? 0
    this._width = options.width ?? 0
    this._height = options.height ?? 0
    this._align = options.align ?? FrameAlign.topLeft
    this._padding = options.padding ?? new Padding({})
    this._children = options.children ?? []
  }

  protected _id: string

  protected _x: number

  protected _y: number

  protected _width: number

  protected _height: number

  protected _align: FrameAlign

  protected _padding: Padding

  protected _children: Frame[]

  private _map = new Map<Frame, FrameDetail>()

  get id() {
    return this._id
  }

  get x() {
    return this._x
  }

  set x(value: number) {
    this._x = value
  }

  get y() {
    return this._y
  }

  set y(value: number) {
    this._y = value
  }

  get width() {
    return this._width
  }

  set width(value: number) {
    this._width = value
  }

  get height() {
    return this._height
  }

  set height(value: number) {
    this._height = value
  }

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

  setX(value: number): this {
    this._x = value
    return this
  }

  setY(value: number): this {
    this._y = value
    return this
  }

  setWidth(value: number): this {
    this._width = value
    this._emitResize()
    return this
  }

  setHeight(value: number): this {
    this._height = value
    this._emitResize()
    return this
  }

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

  add(child: Frame): this {
    this._addWithEvents(child)
    return this
  }

  remove(child: Frame): number {
    const detail = this._map.get(child)
    if (detail !== undefined) {
      this._children.splice(detail.index, 1)
      this._map.delete(child)

      for (const [event, fn] of Object.entries(detail.events)) {
        child.off(event as keyof FrameEvents, fn)
      }
      return detail.index
    }
    return -1
  }

  protected _addWithEvents(child: Frame, events: FrameEvents = {}) {
    const detail: FrameDetail = { index: this._children.length, events }
    this._map.set(child, detail)
    this._children.push(child)
    for (const [event, fn] of Object.entries(detail.events)) {
      child.on(event as keyof FrameEvents, fn)
    }
    return detail
  }

  private _emitResize() {
    this.emit('resize', this._width, this._height)
  }
}
