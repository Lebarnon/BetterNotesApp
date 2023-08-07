<template>
   <q-header :class="$q.dark.isActive ? 'bg-dark text-primary' : 'bg-primary text-dark'">
      <q-toolbar>
        <q-toolbar-title>
          <q-btn flat stretch
          >
          Better Notes
          </q-btn>
        </q-toolbar-title>
        
        <q-btn 
          v-if="$userStore.isAuthenticated"
          @click="$userStore.signOut()"
          no-caps
          class="bg-primary"
          >Sign Out</q-btn>
        <q-btn v-else 
          no-caps
          to="/auth/login">
          Login</q-btn>
        
      </q-toolbar>
    </q-header>
</template>

<script setup>

</script>