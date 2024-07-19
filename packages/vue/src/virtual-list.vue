<template>
  <div class='' />
</template>

<script setup lang="ts">
import type { VirtualListProps } from './virtual-list.type'

withDefaults(defineProps<VirtualListProps>(), {
  items: () => [],
})

</script>

<style scoped>

</style>
