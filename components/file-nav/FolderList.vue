<template>
  <q-list padding class="menu-list q-pr-md">
      <FileNavFolderListItem 
        v-for="collection in collectionStore.collections"
        :icon="collection.icon"
        :name="collection.name"
        class="q-mb-sm"
        :selected="collection.id == collectionStore.getSelectedCollection?.id"
        @handle-click="() => collectionStore.changeSelectedCollection(collection)"
      />
  </q-list>
</template>

<script setup lang="ts">
import { useCollectionsStore } from '@/store/collections';
const collectionStore = useCollectionsStore()


</script>

<style scoped>
.menu-list .q-item {
    border-radius: 0 32px 32px 0
}

</style>