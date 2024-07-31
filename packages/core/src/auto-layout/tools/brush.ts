import { Container, Point } from '../base'

export interface BrushOptions {
  container: Container,
}

export class Brush {
  readonly container = new Container({})

  private _startPosition = new Point()

  start(point: Point): this {
    this._startPosition.set(point)
    return this
  }

  update(point: Point): this {
    if (point.x >= this._startPosition.x) {
      this.container.x = this._startPosition.x
      this.container.width = point.x - this._startPosition.x
    }
    else {
      this.container.x = point.x
      this.container.width = this._startPosition.x - point.x
    }

    if (point.y >= this._startPosition.y) {
      this.container.y = this._startPosition.y
      this.container.height = point.y - this._startPosition.y
    }
    else {
      this.container.y = point.y
      this.container.height = this._startPosition.y - point.y
    }
    return this
  }
}
