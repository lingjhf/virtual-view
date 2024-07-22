<template>
  <div
    ref='virtualRef'
    class='virtual-list'
    :class='[directionClasses]'
    :style='viewStyle'
  >
    <div
      class='virtual-list-container'
      :class='[directionClasses]'
      :style='containerStyle'
    >
      <div
        class='virtual-list-content'
        :class='[directionClasses]'
        :style='contentStyle'
      >
        <slot />
        <template v-if='slots.renderItem'>
          <div
            v-for='item in virtualItems'
            :key='item.y'
            :style='direction === "vertical" ? `height:${item.height}px` : `width:${item.height}px`'
          >
            <slot
              name='renderItem'
              v-bind='item'
            />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { VirtualList } from '@virtual-view/core'
import { computed, onMounted, ref, shallowRef, watch } from 'vue'

import type { VirtualListItemDetail } from '@virtual-view/core'
import type { VirtualListProps } from './virtual-list.type'

const props = withDefaults(
  defineProps<VirtualListProps>(),
  {
    direction: 'vertical',
    items: () => [],
    buffer: 10,
    height: 400,
  },
)

const slots = defineSlots<{
  default?: () => unknown,
  renderItem?: (detail: VirtualListItemDetail) => unknown,
}>()

const virtualItems = ref<VirtualListItemDetail[]>([])
const emits = defineEmits<(e: 'change', items: VirtualListItemDetail[]) => void>()

const virtualScroll = new VirtualList({ items: [], viewHeight: props.height, buffer: 0, change: (items) => {
  if (items.length > 0) {
    contentTop.value = items[0].y
  }
  virtualItems.value = items
  emits('change', items)
} })
const virtualRef = shallowRef<HTMLDivElement>()
const viewHeight = ref(0)
const totalHeight = ref(0)
const contentTop = ref(0)

watch([() => props.items, () => props.height, () => props.buffer], () => {
  if (props.items.length > 0) {
    virtualScroll.setItems(props.items)
    if (virtualRef.value) {
      virtualRef.value.scrollTop = virtualScroll.scrollTop
    }
  }
  if (props.height > 0 && props.height !== virtualScroll.viewHeight) {
    virtualScroll.setViewHeight(props.height)
  }
  if (props.buffer >= 0 && props.buffer !== virtualScroll.buffer) {
    virtualScroll.setBuffer(props.buffer)
  }
  viewHeight.value = virtualScroll.viewHeight
  totalHeight.value = virtualScroll.totalHeight
  virtualScroll.exec()
}, {
  immediate: true,
})

const directionClasses = computed(() => {
  return props.direction === 'vertical' ? 'vertical' : 'horizontal'
})

const viewStyle = computed(() => {
  return props.direction === 'vertical' ? `height:${viewHeight.value}px` : `width:${viewHeight.value}px`
})

const containerStyle = computed(() => {
  return props.direction === 'vertical' ? `height:${totalHeight.value}px` : `width:${totalHeight.value}px`
})

const contentStyle = computed(() => {
  return props.direction === 'vertical' ? `transform: translateY(${contentTop.value}px)` : `transform: translateX(${contentTop.value}px)`
})

onMounted(() => {
  virtualRef.value?.addEventListener('scroll', event => scroll(event))
})

function scroll(event: Event) {
  const eventTarget = event.target as HTMLDivElement
  if (props.direction === 'vertical') {
    virtualScroll.setScrollTop(eventTarget.scrollTop).exec()
  }
  else {
    virtualScroll.setScrollTop(eventTarget.scrollLeft).exec()
  }
}

</script>

<style>
.virtual-list.vertical {
  overflow-y: auto;
}

.virtual-list.horizontal {
  overflow-x: auto;
}

.virtual-list-container {
  position: relative;
}

.virtual-list-container.horizontal {
  height: 100%;
}

.virtual-list-content {
  position: absolute;
}

.virtual-list-content.vertical {
  left: 0;
  right: 0;
}

.virtual-list-content.horizontal {
  top: 0;
  bottom: 0;
  display: flex;
}
</style>
