<template>
  <q-layout view="hHh Lpr fff" class="shadow-2 rounded-borders">
    <LayoutHeader @toggle-left-drawer="toggleLeftDrawer" />

    <LayoutLeftDrawer />
    <q-page-container>
      <slot />
    </q-page-container>
    <LayoutFooter/>
  </q-layout>
</template>

<script setup>

function toggleLeftDrawer(){
  return
}
</script>


