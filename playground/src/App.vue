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
  </div>
</template>

<script setup lang="ts">
import { VirtualList } from '@virtual-view/vue'

const items = Array.from({ length: 1000 }, (_, k) => ({ height: 100 }))

</script>
