<template>
  <q-layout view="hHh Lpr fff" class="shadow-2 rounded-borders bg-primary">
    <LayoutHeader @toggle-left-drawer="toggleLeftDrawer" />

    <LayoutLeftDrawer v-if="useUserStore().isAuthenticated"/>
    <q-page-container>
      <slot />
    </q-page-container>
    <!-- <LayoutFooter/> -->
  </q-layout>
</template>

<script setup>
import { useUserStore } from '~/store/user';


function toggleLeftDrawer(){
  return
}

</script>


