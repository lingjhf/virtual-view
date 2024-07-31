import { Container, Point } from '../base'

export class Draggable {
  constructor(container: Container) {
    this.container = container
  }

  readonly container: Container

  private _startPosition = new Point()

  private _startContainer = new Container({})

  /**
   * 开始位置
   *
   * @param point 位置信息
   * @returns
   */
  start(point: Point): this {
    this._startPosition.set(point)
    this._startContainer = new Container(this.container)
    return this
  }

  /**
   * 拖拽
   *
   * @param point
   * @returns
   */
  update(point: Point): this {
    this.container.x = point.x - this._startPosition.x + this._startContainer.x
    this.container.y = point.y - this._startPosition.y + this._startContainer.y
    return this
  }
}
