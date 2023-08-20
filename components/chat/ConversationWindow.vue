<template>
    <q-list> 
        <div v-for="convo in conversation">
            <q-separator></q-separator>
            <q-item class="q-my-md">
                <q-item-section top avatar>
                    <q-avatar rounded>
                        <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                    </q-avatar>
                </q-item-section>
    
                <q-item-section>
                    <q-item-label overline>UserName</q-item-label>
                    <q-item-label> {{ convo.question }}</q-item-label>
                </q-item-section>
            </q-item>
            <q-separator inset></q-separator>

            <q-item class="q-my-md">
                <q-item-section top avatar>
                    <q-avatar rounded>
                        <img src="https://robohash.org/better-notes">
                    </q-avatar>
                </q-item-section>
                <q-item-section>
                    <q-item-label overline>Better Notes</q-item-label>
                    <q-item-label v-if="convo.answer"> {{ convo.answer }}</q-item-label>
                    <q-item-label v-else="convo.answer"> <q-spinner-dots size="2rem" /></q-item-label>
                </q-item-section>
            </q-item>
            <q-separator></q-separator>

        </div>
    </q-list>
</template>

<script setup lang="ts">
const props = defineProps<{
    conversation: any
}>()
</script>