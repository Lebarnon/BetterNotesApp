<template>
  <q-list padding>
    
    <FileNavFileListItem 
      v-for="file in documentStore.getDocuments"
      :app-document="file"
      :is-selected="documentStore.isDocumentSelect(file)"
      @on-app-document-clicked="documentStore.setSelectedDocument(file)"
    />

  </q-list>
</template>

<script setup lang="ts">
import { AppDocument } from '@/types/types'
import { useDocumentsStore } from '@/store/documents';

const documentStore = useDocumentsStore()
</script>

<style scoped>


</style>