<template>
    <q-form
        @submit="handleFormSubmit"
        autocomplete="off"
        class="q-ma-sm"
    >
        <q-input
            v-model="queryInput"
            placeholder="Type a message..."
            standout
            rounded
        >
        <template v-slot:after>
            <q-btn round dense flat icon="send" @click="handleFormSubmit"/>
        </template>
        </q-input>
    </q-form>
</template>

<script setup lang="ts">
const queryInput = ref("")
const emits = defineEmits(['handleFormSubmit'])
function handleFormSubmit(){
    emits("handleFormSubmit", queryInput.value)
    queryInput.value = ""
}
</script>