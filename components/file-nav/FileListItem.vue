<template>
  <q-item clickable v-ripple>
    <q-item-section avatar top>
      <q-avatar :icon="icon" color="grey" text-color="white" />
    </q-item-section>

    <q-item-section>
      <q-item-label lines="1">{{ name }}</q-item-label>
      <q-item-label caption>March 2nd, 2019</q-item-label>
    </q-item-section>

    <q-item-section side>
      <q-icon name="info" />
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
const props = defineProps(['name','icon'])
</script>