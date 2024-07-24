<template>
  <div>
    <VirtualList
      class='h-100px'
      direction='horizontal'
      :items='items'
    >
      <template #renderItem='{index}'>
        {{ index }}
      </template>
    </VirtualList>
    <my-counter />
  </div>
</template>

<script setup lang="ts">
import { VirtualList } from '@virtual-view/vue'
import '@virtual-view/solid'
const items = Array.from({ length: 1000 }, (_, k) => ({ height: 100 }))

declare global {
  interface HTMLElementTagNameMap {
    'my-counter': { someProp: 'one', otherProp: 'two', },
  }
}

</script>
