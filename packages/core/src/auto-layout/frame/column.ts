import { Container } from '../base/container'
import { FrameAlign } from '../constants'
import { Flex } from './flex'

export class Column extends Flex {
  private _childrenHeight = 0

  setGap(value: number): this {
    this._childrenHeight -= (this._children.length - 1) * this._gap
    super.setGap(value)
    this._childrenHeight += (this._children.length - 1) * this._gap
    return this
  }

  add(child: Container): this {
    const len = this._children.length
    this._addWithEvents(child, { resize: this._watchChildResize(child) })
    if (this._children.length > len) {
      if (this._children.length === 1) {
        this._childrenHeight = child.height
      }
      else {
        this._childrenHeight += child.height + this._gap
      }
    }
    return this
  }

  remove(child: Container): number {
    const index = super.remove(child)
    if (index > -1) {
      if (this._children.length === 0) {
        this._childrenHeight = 0
      }
      else {
        this._childrenHeight -= child.height + this._gap
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

  private _topLeftLayout() {
    let top = this.padding.top
    for (const child of this._children) {
      child.x = this.padding.left
      child.y = top
      top = child.y + child.height + this._gap
    }
  }

  private _topCenterLayout() {
    let top = this.padding.top
    const widthCenter = this._getWidthCenter()
    for (const child of this._children) {
      child.x = widthCenter - child.width / 2
      child.y = top
      top = child.y + child.height + this._gap
    }
  }

  private _topRightLayout() {
    let top = this.padding.top
    for (const child of this._children) {
      child.x = this.width - this.padding.right - child.width
      child.y = top
      top = child.y + child.height + this._gap
    }
  }

  private _centerLeftLayout() {
    let top = this._getHeightCenter() - this._childrenHeight / 2
    for (const child of this._children) {
      child.x = this.padding.left
      child.y = top
      top = child.y + child.height + this._gap
    }
  }

  private _centerLayout() {
    const widthCenter = this._getWidthCenter()
    let top = this._getHeightCenter() - this._childrenHeight / 2
    for (const child of this._children) {
      child.x = widthCenter - child.width / 2
      child.y = top
      top = child.y + child.height + this._gap
    }
  }

  private _centerRightLayout() {
    let top = this._getHeightCenter() - this._childrenHeight / 2
    for (const child of this._children) {
      child.x = this.width - this.padding.right - child.width
      child.y = top
      top = child.y + child.height + this._gap
    }
  }

  private _bottomLeftLayout() {
    let top = this.height - this.padding.bottom - this._childrenHeight
    for (const child of this._children) {
      child.x = this.padding.left
      child.y = top
      top = child.y + child.height + this._gap
    }
  }

  private _bottomCenterLayout() {
    const widthCenter = this._getWidthCenter()
    let top = this.height - this.padding.bottom - this._childrenHeight
    for (const child of this._children) {
      child.x = widthCenter - this.width / 2
      child.y = top
      top = child.y + child.height + this._gap
    }
  }

  private _bottomRightLayout() {
    let top = this.height - this.padding.bottom - this._childrenHeight
    for (const child of this._children) {
      child.x = this.width - this.padding.right - child.width
      child.y = top
      top = child.y + child.height + this._gap
    }
  }

  private _getWidthCenter() {
    return (this.width - this.padding.left - this.padding.right) / 2 + this.padding.left
  }

  private _getHeightCenter() {
    return (this.height - this.padding.top - this.padding.bottom) / 2 + this.padding.top
  }

  private _watchChildResize(child: Container) {
    let height = child.height
    return () => {
      this._childrenHeight -= height
      height = child.width
      this._childrenHeight += height
    }
  }
}
