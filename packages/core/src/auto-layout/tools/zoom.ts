import { Container, Point, Scale } from '../base'

export class Zoom {
  constructor(container: Container) {
    this.container = container
  }

  readonly container: Container

  private _startScale = new Scale()

  /**
   *设置开始的缩放大小
   *
   * @param scale
   * @returns
   */
  start(scale: Scale): this {
    this._startScale = scale
    return this
  }

  /**
   *根据焦点位置更新缩放后的位置
   *
   * @param scale 缩放大小
   * @param focus 焦点位置
   * @returns
   */
  update(scale: Scale, focus: Point): this {
    const zoomX = scale.x / this._startScale.x
    const zoomY = scale.y / this._startScale.y
    this.container.x = focus.x - zoomX * (focus.x - this.container.x)
    this.container.y = focus.y - zoomY * (focus.y - this.container.y)
    return this
  }
}
