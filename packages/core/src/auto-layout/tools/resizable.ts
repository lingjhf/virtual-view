import { Container, Point } from '../base'

export class Resizable {
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
   * 向左拉伸
   *
   * @param x
   * @returns
   */
  leftUpdate(x: number): this {
    this.container.x = x - this._startPosition.x + this._startContainer.x
    this.container.width = this._startContainer.width + this._startPosition.x - x
    return this
  }

  /**
   * 向上拉伸
   *
   * @param y
   * @returns
   */
  topUpdate(y: number): this {
    this.container.y = y - this._startPosition.y + this._startContainer.y
    this.container.height = this._startContainer.height + this._startPosition.y - y
    return this
  }

  /**
   * 向右拉伸
   *
   * @param x
   * @returns
   */
  rightUpdate(x: number): this {
    this.container.width = this._startContainer.width + this._startPosition.x - x
    return this
  }

  /**
   * 向下拉伸
   *
   * @param y
   * @returns
   */
  bottomUpdate(y: number): this {
    this.container.height = this._startContainer.height + this._startContainer.y - y
    return this
  }

  /**
   * 向左上拉伸
   *
   * @param point
   * @returns
   */
  topLeftUpdate(point: Point): this {
    this.leftUpdate(point.x)
    this.topUpdate(point.y)
    return this
  }

  /**
   * 向右上拉伸
   *
   * @param point
   * @returns
   */
  topRightUpdate(point: Point): this {
    this.rightUpdate(point.x)
    this.topUpdate(point.y)
    return this
  }

  /**
   * 向左下拉伸
   *
   * @param point
   * @returns
   */
  bottomLeftUpdate(point: Point): this {
    this.leftUpdate(point.x)
    this.bottomUpdate(point.y)
    return this
  }

  /**
   * 向右下拉伸
   *
   * @param point
   * @returns
   */
  bottomRightUpdate(point: Point): this {
    this.rightUpdate(point.x)
    this.bottomUpdate(point.y)
    return this
  }
}
