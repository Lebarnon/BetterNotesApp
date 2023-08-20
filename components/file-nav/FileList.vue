<template>
  <q-list padding>
    <FileNavFileListItem 
      v-if="documentStore.getDocuments.length"
      v-for="file in documentStore.getDocuments"
      :app-document="file"
      :is-selected="documentStore.isDocumentSelect(file)"
      @on-app-document-clicked="documentStore.setSelectedDocument(documentStore.isDocumentSelect(file) ? null : file)"
    />
    <p v-else class="text-center">
      <q-item-section>
        <q-item-label caption>You have no files</q-item-label>
      </q-item-section>
    </p>
  </q-list>
</template>

<script setup lang="ts">
import { AppDocument } from '@/types/types'
import { useDocumentsStore } from '@/store/documents';

const documentStore = useDocumentsStore()
</script>

<style scoped>


</style>