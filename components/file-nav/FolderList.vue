<template>
  <q-list padding class="menu-list q-pr-md">
      <FileNavFolderListItem 
        v-if="collectionStore.collections?.length"
        v-for="collection in collectionStore.collections"
        :icon="collection.icon"
        :name="collection.name"
        class="q-mb-sm"
        :selected="collection.id == collectionStore.getSelectedCollection?.id"
        @handle-click="() => collectionStore.changeSelectedCollection(collection)"
      />
      <p v-else class="text-center">
        <q-item-section>
          <q-item-label caption>You have no collections</q-item-label>
        </q-item-section>
      </p>
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