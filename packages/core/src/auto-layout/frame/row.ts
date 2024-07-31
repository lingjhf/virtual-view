import { Container } from '../base/container'
import { FrameAlign } from '../constants'
import { Flex } from './flex'

export class Row extends Flex {
  private _childrenWidth = 0

  setGap(value: number): this {
    this._childrenWidth -= (this._children.length - 1) * this._gap
    super.setGap(value)
    this._childrenWidth += (this._children.length - 1) * this._gap
    return this
  }

  add(child: Container): this {
    const len = this._children.length
    this._addWithEvents(child, { resize: this._watchChildResize(child) })
    if (this._children.length > len) {
      if (this._children.length === 1) {
        this._childrenWidth = child.width
      }
      else {
        this._childrenWidth += child.width + this._gap
      }
    }
    return this
  }

  remove(child: Container): number {
    const index = super.remove(child)
    if (index > -1) {
      if (this._children.length === 0) {
        this._childrenWidth = 0
      }
      else {
        this._childrenWidth -= child.width + this._gap
      }
    }
    return index
  }

  layout() {
    switch (this.align) {
      case FrameAlign.topLeft:
        this._topLeftLayout()
        break
      case FrameAlign.topCenter:
        this._topCenterLayout()
        break
      case FrameAlign.topRight:
        this._topRightLayout()
        break
      case FrameAlign.centerLeft:
        this._centerLeftLayout()
        break
      case FrameAlign.center:
        this._centerLayout()
        break
      case FrameAlign.centerRight:
        this._centerRightLayout()
        break
      case FrameAlign.bottomLeft:
        this._bottomLeftLayout()
        break
      case FrameAlign.bottomCenter:
        this._bottomCenterLayout()
        break
      case FrameAlign.bottomRight:
        this._bottomRightLayout()
        break
    }
    return this
  }

  /**
   * 计算左上角对齐所有元素的位置
   */
  private _topLeftLayout() {
    let left = this.padding.left
    for (const child of this._children) {
      child.x = left
      child.y = this.padding.top
      left = child.x + child.width + this._gap
    }
  }

  private _topCenterLayout() {
    let left = this._getWidthCenter() - this._childrenWidth / 2
    for (const child of this._children) {
      child.x = left
      child.y = this.padding.top
      left = child.x + child.width + this._gap
    }
  }

  private _topRightLayout() {
    let left = this.width - this.padding.right - this._childrenWidth
    for (const child of this._children) {
      child.x = left
      child.y = this.padding.top
      left = child.x + child.width + this._gap
    }
  }

  private _centerLeftLayout() {
    let left = this.padding.left
    const heightCenter = this._getHeightCenter()
    for (const child of this._children) {
      child.x = left
      child.y = heightCenter - child.height / 2
      left = child.x + child.width + this._gap
    }
  }

  private _centerLayout() {
    const heightCenter = this._getHeightCenter()
    let left = this._getWidthCenter() - this._childrenWidth / 2
    for (const child of this._children) {
      child.x = left
      child.y = heightCenter - child.height / 2
      left = child.x + child.width + this._gap
    }
  }

  private _centerRightLayout() {
    const heightCenter = this._getHeightCenter()
    let left = this.width - this.padding.right - this._childrenWidth
    for (const child of this._children) {
      child.x = left
      child.y = heightCenter - child.height / 2
      left = child.x + child.width + this._gap
    }
  }

  private _bottomLeftLayout() {
    let left = this.padding.left
    for (const child of this._children) {
      child.x = left
      child.y = this.height - this.padding.top - child.height
      left = child.x + child.width + this._gap
    }
  }

  private _bottomCenterLayout() {
    let left = this._getWidthCenter() - this._childrenWidth / 2
    for (const child of this._children) {
      child.x = left
      child.y = this.height - this.padding.top - child.height
      left = child.x + child.width + this._gap
    }
  }

  private _bottomRightLayout() {
    let left = this.width - this.padding.right - this._childrenWidth
    for (const child of this._children) {
      child.x = left
      child.y = this.height - this.padding.top - child.height
      left = child.x + child.width + this._gap
    }
  }

  private _getWidthCenter() {
    return (this.width - this.padding.left - this.padding.right) / 2 + this.padding.left
  }

  private _getHeightCenter() {
    return (this.height - this.padding.top - this.padding.bottom) / 2 + this.padding.top
  }

  private _watchChildResize(child: Container) {
    let width = child.width
    return () => {
      this._childrenWidth -= width
      width = child.width
      this._childrenWidth += width
    }
  }
}
