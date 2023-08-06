<template>
    <q-drawer
        v-model="drawer"
        show-if-above
        :width="200"
        :breakpoint="500"
      >
        <FileNavFolderList />
    </q-drawer>
</template>

<script setup>
import { ref } from 'vue'

const drawer = ref(true)
</script>

