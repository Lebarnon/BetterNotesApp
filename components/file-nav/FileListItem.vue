<template>
  <q-item clickable v-ripple
    @click="onAppDocumentClicked()"
    :class="isSelected ? 'bg-grey' : ''"
  >
    <q-item-section avatar top>
      <q-avatar v-if="isLoading" c>
        <q-spinner-box color="blue-9" size="2em" />
      </q-avatar>
      <q-avatar v-else :icon="appDocument.icon" color="grey" text-color="white" />
    </q-item-section>

    <q-item-section>
      <q-item-label lines="1">{{ appDocument.name }}</q-item-label>
      <q-item-label v-if="isLoading" caption>Extracting info...</q-item-label>
      <q-item-label v-else caption>March 2nd, 2019</q-item-label>
    </q-item-section>

    <q-item-section v-if="!isLoading" side>
      <q-icon name="info" />
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import {AppDocument} from '@/types/types'
const props = defineProps<{
  appDocument: AppDocument, 
  isSelected: boolean, 
}>()
const emits = defineEmits(['onAppDocumentClicked'])

const isLoading = computed(() => {
  if(props.appDocument.status == 'ready'){
    return false
  }else{
    return true
  }
})

function onAppDocumentClicked(){
  emits("onAppDocumentClicked")
}

</script>