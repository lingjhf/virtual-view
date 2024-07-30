import EventEmitter from 'eventemitter3'
import { v4 as uuidv4 } from 'uuid'

export interface ContainerOptions {
  x?: number,
  y?: number,
  width?: number,
  height?: number,
  children?: Container[],
}

export interface ContainerEvents {
  resize?: (width: number, height: number) => void,
}

interface ContainerDetail {
  index: number,
  events: ContainerEvents,
}

export class Container extends EventEmitter<ContainerEvents> {
  constructor(options: ContainerOptions) {
    super()
    this._id = uuidv4()
    this._x = options.x ?? 0
    this._y = options.y ?? 0
    this._width = options.width ?? 0
    this._height = options.height ?? 0
    this._children = options.children ?? []
  }

  protected _id: string

  protected _x: number

  protected _y: number

  protected _width: number

  protected _height: number

  protected _children: Container[]

  private _map = new Map<Container, ContainerDetail>()

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

  add(child: Container): this {
    this._addWithEvents(child)
    return this
  }

  remove(child: Container): number {
    const detail = this._map.get(child)
    if (detail !== undefined) {
      this._children.splice(detail.index, 1)
      this._map.delete(child)

      for (const [event, fn] of Object.entries(detail.events)) {
        child.off(event as keyof ContainerEvents, fn)
      }
      return detail.index
    }
    return -1
  }

  protected _addWithEvents(child: Container, events: ContainerEvents = {}) {
    const detail: ContainerDetail = { index: this._children.length, events }
    this._map.set(child, detail)
    this._children.push(child)
    for (const [event, fn] of Object.entries(detail.events)) {
      child.on(event as keyof ContainerEvents, fn)
    }
    return detail
  }

  private _emitResize() {
    this.emit('resize', this._width, this._height)
  }
}
