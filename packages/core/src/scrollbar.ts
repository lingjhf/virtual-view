export interface ScrollbarOptions {
  viewWidth: number,
  viewHeight: number,
  contentWidth: number,
  contentHeight: number,
  thumbMinWidth: number,
  thumbMinHeight: number,
}

export class Scrollbar {
  constructor(options?: Partial<ScrollbarOptions>) {
    this._horizontalThumb = new Thumb({
      viewWidth: options?.viewWidth,
      contentWidth: options?.contentWidth,
      minWidth: options?.thumbMinWidth,
    })
    this._verticalThumb = new Thumb({
      viewWidth: options?.viewHeight,
      contentWidth: options?.contentHeight,
      minWidth: options?.thumbMinHeight,
    })
  }

  private _verticalThumb: Thumb

  private _horizontalThumb: Thumb

  get horizontalScrollX(): number {
    return this._horizontalThumb.scrollX
  }

  get verticalScrollY(): number {
    return this._verticalThumb.scrollX
  }

  get horizontalThumbX(): number {
    return this._horizontalThumb.thumbX
  }

  get verticalThumbY(): number {
    return this._verticalThumb.thumbX
  }

  get horizontalThumbWidth(): number {
    return this._horizontalThumb.thumbWidth
  }

  get verticalThumbHeight(): number {
    return this._verticalThumb.thumbWidth
  }

  get viewWidth(): number {
    return this._horizontalThumb.viewWidth
  }

  get viewHeight(): number {
    return this._verticalThumb.viewWidth
  }

  get contentWidth(): number {
    return this._horizontalThumb.contentWidth
  }

  get contentHeight(): number {
    return this._verticalThumb.contentWidth
  }

  setViewWidth(value: number): this {
    this._horizontalThumb.setViewWidth(value)
    return this
  }

  setViewHeight(value: number): this {
    this._verticalThumb.setViewWidth(value)
    return this
  }

  setContentWidth(value: number): this {
    this._horizontalThumb.setContentWidth(value)
    return this
  }

  setContentHeight(value: number): this {
    this._verticalThumb.setContentWidth(value)
    return this
  }

  scrollTo(options: { x?: number, y?: number, }): this {
    if (options.x !== undefined) {
      this._horizontalThumb.scrollTo(options.x)
    }
    if (options.y !== undefined) {
      this._verticalThumb.scrollTo(options.y)
    }
    return this
  }

  thumbTo(options: { x?: number, y?: number, }): this {
    if (options.x !== undefined) {
      this._horizontalThumb.thumbTo(options.x)
    }
    if (options.y !== undefined) {
      this._verticalThumb.thumbTo(options.y)
    }
    return this
  }
}

interface ThumbOptions {
  viewWidth: number,
  contentWidth: number,
  minWidth: number,
}

class Thumb {
  constructor(options?: Partial<ThumbOptions>) {
    this._viewWidth = getWidth(this._viewWidth, options?.viewWidth)
    this._contentWidth = getWidth(this._contentWidth, options?.contentWidth)
    if ((options?.minWidth ?? 0) > 0) {
      /* eslint-disable @typescript-eslint/no-non-null-assertion */
      this._thumbMinWidth = options!.minWidth!
    }
    if (this._contentWidth > this._viewWidth) {
      this._thumbWidth = this._getCalcThumbWidth()
    }
  }

  private _viewWidth = 0

  private _contentWidth = 0

  private _scrollX = 0

  private _thumbWidth = 0

  private _thumbMinWidth = 40

  private _thumbX = 0

  get scrollX(): number {
    return this._scrollX
  }

  get thumbX(): number {
    return this._thumbX
  }

  get thumbWidth(): number {
    return this._thumbWidth
  }

  get viewWidth(): number {
    return this._viewWidth
  }

  get contentWidth(): number {
    return this._contentWidth
  }

  /**
     * 设置可见区域大小
     *
     * @param value
     * @returns
     */

  setViewWidth(value: number): this {
    const viewWidth = getWidth(this._viewWidth, value)
    if (viewWidth != this._viewWidth) {
      this._viewWidth = viewWidth
      this._setThumb()
    }
    return this
  }

  /**
     * 设置内容大小
     *
     * @param value
     * @returns
     */
  setContentWidth(value: number): this {
    const contentWidth = getWidth(this._contentWidth, value)
    if (contentWidth != this._contentWidth) {
      this._contentWidth = contentWidth
      this._setThumb()
    }
    return this
  }

  /**
     * 根据滚动距离计算滑块位置
     *
     * @param value - 滚动距离
     */
  scrollTo(value: number): this {
    let scrollX = value
    const maxScrollX = this._contentWidth - this._viewWidth
    if (scrollX < 0) {
      scrollX = 0
    }
    else if (scrollX > maxScrollX) {
      scrollX = maxScrollX
    }
    this._scrollX = scrollX
    this._thumbX = this._getCalcThumbX()
    return this
  }

  /**
     * 根据滑块位置计算滚动距离
     *
     * @param value 滑块跳转位置
     * @returns
     */
  thumbTo(value: number): this {
    let thumbX = value
    if (thumbX < 0) {
      thumbX = 0
    }
    else if (thumbX + this._thumbWidth > this._viewWidth) {
      thumbX = this._viewWidth - this._thumbWidth
    }
    this._thumbX = thumbX
    this._scrollX = this._getCalcScrollX()
    this.scrollTo(this._scrollX)
    return this
  }

  private _setThumb() {
    if (this._contentWidth > this._viewWidth) {
      this._thumbWidth = this._getCalcThumbWidth()
      this._thumbX = this._getCalcThumbX()
    }
    else {
      this._thumbWidth = 0
      this._thumbX = 0
    }
  }

  private _getCalcThumbWidth(): number {
    const thumbWidth = calcThumbWidth(this._viewWidth, this._contentWidth)
    return thumbWidth > this._thumbMinWidth ? thumbWidth : this._thumbMinWidth
  }

  private _getCalcThumbX(): number {
    const thumbX = calcThumbX(this._scrollX, this._thumbWidth, this._viewWidth, this._contentWidth)
    if (thumbX < 0) {
      return 0
    }
    if (thumbX + this._thumbWidth > this._viewWidth) {
      return this._viewWidth - this._thumbWidth
    }
    return thumbX
  }

  /**
     * 获取计算后的滚动距离
     *
     * @returns 滚动距离
     */
  private _getCalcScrollX(): number {
    const scrollX = calcScrollX(this._thumbX, this._thumbWidth, this._viewWidth, this._contentWidth)
    if (scrollX < 0) {
      return 0
    }
    const maxScrollX = this._contentWidth - this._viewWidth
    if (scrollX > maxScrollX) {
      return maxScrollX
    }
    return scrollX
  }
}

/**
   * 计算一个有效的宽度或者宽度
   *
   * @param oldSize
   * @param newSize
   * @returns
   */
function getWidth(oldWidth: number, newWidth?: number): number {
  let size = oldWidth
  if (newWidth === undefined) {
    return size
  }
  if (newWidth !== undefined) {
    size = newWidth < 0 ? 0 : newWidth
  }
  return size
}

/**
   * 计算滑块宽度
   *
   * 滑块宽度 = 可见区域宽度 / (画布宽度 / 可见区域宽度)
   *
   * 简化公式：可见区域宽度^2 / 画布宽度
   * @param viewWidth - 可见区域宽度
   * @param contentWidth - 画布宽度
   */
function calcThumbWidth(viewWidth: number, contentWidth: number): number {
  if (contentWidth > viewWidth) {
    return viewWidth ** 2 / contentWidth
  }
  return 0
}

/**
   * 计算滑块位置
   *
   * 滑块位置 = 滚动距离 * ((可见区域宽度 - 滑块宽度) / (画布宽度 - 可见区域宽度))
   */
function calcThumbX(scrollX: number, thumbWidth: number, viewWidth: number, contentWidth: number): number {
  if (contentWidth > viewWidth && thumbWidth < viewWidth && contentWidth - viewWidth >= scrollX) {
    return scrollX * ((viewWidth - thumbWidth) / (contentWidth - viewWidth))
  }
  return 0
}

/**
   * 计算滚动距离
   *
   * 滚动距离 = 滑块位置 / ((可见区域宽度 - 滑块宽度) / (画布宽度 - 可见区域宽度))
   */
function calcScrollX(thumbX: number, thumbWidth: number, viewWidth: number, contentWidth: number): number {
  if (contentWidth > viewWidth && thumbWidth < viewWidth && viewWidth - thumbWidth >= thumbX) {
    return thumbX / ((viewWidth - thumbWidth) / (contentWidth - viewWidth))
  }
  return 0
}
