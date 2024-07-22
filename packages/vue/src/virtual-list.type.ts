import type { VirtualListItem } from '@virtual-view/core'

export type VirtualListDirection = 'vertical' | 'horizontal'

export interface VirtualListProps {
  direction?: VirtualListDirection,
  items?: VirtualListItem[],
  buffer?: number,
  height?: number,
}
