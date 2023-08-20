<template>
    <div class="q-pa-md">
        <q-list bordered padding>
            <q-item-label header>Document</q-item-label>
            <q-item>
                <q-item-section>
                    <q-item-label>{{ data.name }}</q-item-label>
                    <q-item-label caption>{{ data.type }}</q-item-label>
                </q-item-section>
            </q-item>
            <q-separator spaced />
            <q-item-label header>Details</q-item-label>
            <q-item>
                <q-item-section>Date Created</q-item-section>
                <q-item-label caption>{{ new Date(data.dateCreated.seconds*1000) }}</q-item-label>
            </q-item>
            <q-item>
                <q-item-section>Download</q-item-section>
                <q-item-label caption>
                    <q-btn :href="data.downloadURL!" target="_blank" no-caps icon="download" label="Download"/>
                </q-item-label>
            </q-item>
            <q-item>
                <q-item-section>Delete</q-item-section>
                <q-item-label caption>
                    <q-btn @click="handleDeleteClick" no-caps color="red" icon="delete" label="Delete"/>
                </q-item-label>
            </q-item>
        </q-list>
    </div>
</template>

<script setup lang="ts">
import AppDocument from 'types/AppDocument';

const props = defineProps<{
    data: AppDocument
}>()

const emits = defineEmits(["handleDeleteClick"])
function handleDeleteClick(){
    emits("handleDeleteClick")
}
</script>