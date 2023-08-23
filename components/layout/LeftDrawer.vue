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
          @click="prompt = true"
        />
        <q-scroll-area style="height: 80vh;">
          <FileNavFolderList />
        </q-scroll-area>
    </q-drawer>
    <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Create Collection</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="newName" autofocus placeholder="Collection Name" @keyup.enter="prompt = false; handleAddCollection();"  />
        </q-card-section>

        <q-card-actions align="right" class="text-dark">
          <q-btn flat no-caps label="Cancel" v-close-popup />
          <q-btn flat no-caps label="Create" v-close-popup @click="handleAddCollection()"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
</template>

<script setup>
import { useUserStore } from '~/store/user';
import { ref } from 'vue'
import { useCollectionsStore } from '~/store/collections';

const collectionStore = useCollectionsStore()
const drawer = computed(() => useUserStore().isAuthenticated)
const $q = useQuasar()
const prompt = ref(false)
const newName = ref("")
function handleAddCollection(){
  let name = ''
  if(newName.value.trim() == ""){
    name = 'collection'
  }else{
    name = newName.value.trim()
  }
  collectionStore.createCollection(name)
  newName.value = ""
}
</script>

<!-- <style>
.q-btn--flat span{
  color: black;
}
</style> -->