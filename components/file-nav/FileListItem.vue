<template>
  <q-item clickable v-ripple
    @click="onAppDocumentClicked()"
    :class="isSelected ? 'bg-grey' : ''"
  >
    <q-item-section avatar top>
      <q-avatar :icon="appDocument.icon" color="grey" text-color="white" />
    </q-item-section>

    <q-item-section>
      <q-item-label lines="1">{{ appDocument.name }}</q-item-label>
      <q-item-label caption>March 2nd, 2019</q-item-label>
    </q-item-section>

    <q-item-section side>
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
function onAppDocumentClicked(){
  emits("onAppDocumentClicked")
}

</script>