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
    <Counter />
  </div>
</template>

<script setup lang="ts">
import { VirtualList } from '@virtual-view/vue'
import '@virtual-view/components/vue'

const items = Array.from({ length: 1000 }, (_, k) => ({ height: 100 }))

</script>
