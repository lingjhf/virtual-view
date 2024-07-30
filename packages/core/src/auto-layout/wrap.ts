import { Frame } from './frame'

export class Wrap extends Frame {
  horizontalGap = 0

  verticalGap = 0

  layout(): this {
    return this
  }
}
