<template>
    <q-item clickable v-ripple class="bg-grey-4">
        <q-item-section avatar>
            <q-icon :name="icon" />
        </q-item-section>

        <q-item-section>
            {{name}}
        </q-item-section>
    </q-item>
</template>

<script setup>
    const props = defineProps(["icon", "name"])
</script>