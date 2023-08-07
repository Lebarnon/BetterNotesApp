<template>
  <q-list padding>
    
    <FileNavFileListItem 
      v-for="file in files"
      :icon="file.icon"
      :name="file.name"
      class=""
    />

  </q-list>
</template>

<script setup lang="ts">
import { AppDocument } from '@/types/types'
const files = ref<Array<AppDocument>>([
  {
    id: "document1",
    name: "test",
    icon: "assignment"
  },
  {
    id: "document1",
    name: "test",
    icon: "assignment"
  },
  {
    id: "document1",
    name: "test",
    icon: "assignment"
  },
  {
    id: "document1",
    name: "test",
    icon: "assignment"
  },
  {
    id: "document1",
    name: "test",
    icon: "assignment"
  },
  {
    id: "document1",
    name: "test",
    icon: "assignment"
  },
  {
    id: "document1",
    name: "test",
    icon: "assignment"
  },
  {
    id: "document1",
    name: "test",
    icon: "assignment"
  },
  {
    id: "document1",
    name: "test",
    icon: "assignment"
  },
  {
    id: "document1",
    name: "test",
    icon: "assignment"
  },
  {
    id: "document1",
    name: "test",
    icon: "assignment"
  },
  {
    id: "document1",
    name: "test",
    icon: "assignment"
  },
  {
    id: "document1",
    name: "test",
    icon: "assignment"
  },
  {
    id: "document1",
    name: "test",
    icon: "assignment"
  },
  {
    id: "document1",
    name: "test",
    icon: "assignment"
  },
  {
    id: "document1",
    name: "test",
    icon: "assignment"
  },
  {
    id: "document1",
    name: "test",
    icon: "assignment"
  },
  {
    id: "document1",
    name: "test",
    icon: "assignment"
  },
  {
    id: "document1",
    name: "test",
    icon: "assignment"
  },
  {
    id: "document1",
    name: "test",
    icon: "assignment"
  },
  {
    id: "document1",
    name: "test",
    icon: "assignment"
  },
  {
    id: "document1",
    name: "test",
    icon: "assignment"
  },
  {
    id: "document1",
    name: "test",
    icon: "assignment"
  },
  {
    id: "document1",
    name: "test",
    icon: "assignment"
  },
  {
    id: "document1",
    name: "test",
    icon: "assignment"
  },
  {
    id: "document1",
    name: "test",
    icon: "assignment"
  },
  {
    id: "document1",
    name: "test",
    icon: "assignment"
  },
  {
    id: "document1",
    name: "test",
    icon: "assignment"
  },
  {
    id: "document1",
    name: "test",
    icon: "assignment"
  },
  {
    id: "document1",
    name: "test",
    icon: "assignment"
  },
  {
    id: "document1",
    name: "test",
    icon: "assignment"
  },
  {
    id: "document1",
    name: "test",
    icon: "assignment"
  },
  {
    id: "document1",
    name: "test",
    icon: "assignment"
  },
  {
    id: "document1",
    name: "test",
    icon: "assignment"
  },
  {
    id: "document1",
    name: "test",
    icon: "assignment"
  },
  {
    id: "document1",
    name: "test",
    icon: "assignment"
  },
  {
    id: "document1",
    name: "test",
    icon: "assignment"
  },
])
</script>

<style scoped>


</style>