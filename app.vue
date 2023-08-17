<template>
  <NuxtLayout>
    <div>
      <NuxtPage />
    </div>
  </NuxtLayout>

</template>

<script setup lang="ts">
import { useCollectionsStore } from '@/store/collections';

onBeforeUnmount(() => {
  for(const unsub of useCollectionsStore().unsubscribes){
    unsub()
  }
})
</script>