<template>
    <q-drawer
        v-model="drawer"
        show-if-above
        :width="200"
        :breakpoint="500"
        class="bg-primary"
      >
        <q-btn
          icon="add"
          label="New"
          no-caps
          class="q-ml-md q-my-md q-pa-md"
          style="border-radius: 10px;"
          @click="handleAddCollection()"
        />
        <q-scroll-area style="height: 80vh;">
          <FileNavFolderList />
        </q-scroll-area>
    </q-drawer>
</template>

<script setup>
import { useUserStore } from '~/store/user';
import { ref } from 'vue'
import { useCollectionsStore } from '~/store/collections';

const collectionStore = useCollectionsStore()
const drawer = computed(() => useUserStore().isAuthenticated)

function handleAddCollection(){
  collectionStore.createCollection("newName")
}
</script>

