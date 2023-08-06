<template>
   <q-scroll-area class="fit">
    <q-list padding class="menu-list">
      
      <FileNavFolderListItem 
        v-for="collection in collections"
        :icon="collection.icon"
        :name="collection.name"
      />

    </q-list>
  </q-scroll-area>
</template>

<script setup lang="ts">
import Collection from '@/types/Collection'
const collections = ref<Array<Collection>>([
  {
    id: "hi",
    name: "test",
    icon: "folder"
  }
])
</script>

<style scoped>
.menu-list .q-item {
    border-radius: 0 32px 32px 0
}

</style>