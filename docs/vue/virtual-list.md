<script setup>
import { VirtualList } from "@virtual-view/vue";

const verticalItems = Array.from({ length: 1000 }, () => ({ height: 30 }));


const horizontalItems = Array.from({ length: 1000 }, () => ({ height: 100 }));
</script>

# Vue 虚拟列表组件

virtual-view 带有内置的 vue 虚拟列表组件

## Basic

<VirtualList class="w-400px" :height="200" :items="verticalItems">
  <template #renderItem="{ index }">
    {{ index }}
  </template>
</VirtualList>

```vue
<VirtualList class="w-400px" :height="200" :items="verticalItems">
  <template #renderItem="{ index }">
    {{ index }}
  </template>
</VirtualList>

<script setup lang="ts">
import { VirtualList } from "@virtual-view/vue";

const items = Array.from({ length: 1000 }, () => ({ height: 80 }));
</script>
```

## Horizontal

<VirtualList class="h-100px" direction="horizontal" :items="horizontalItems">
  <template #renderItem="{ index }">
    {{ index }}
  </template>
</VirtualList>

```vue
<VirtualList class="h-100px" direction="horizontal" :items="items">
  <template #renderItem="{ index }">
    {{ index }}
  </template>
</VirtualList>

<script setup lang="ts">
import { VirtualList } from "@virtual-view/vue";

const items = Array.from({ length: 1000 }, () => ({ height: 80 }));
</script>
```
