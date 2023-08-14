<template>
  <q-list padding>
    
    <FileNavFileListItem 
      v-for="file in useDocumentsStore().getDocuments"
      :icon="file.icon"
      :name="file.name"
      class=""
    />

  </q-list>
</template>

<script setup lang="ts">
import { AppDocument } from '@/types/types'
import { useDocumentsStore } from '@/store/documents';
</script>

<style scoped>


</style>