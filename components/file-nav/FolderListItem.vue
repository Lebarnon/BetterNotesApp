<template>
    <q-item 
        clickable 
        v-ripple 
        :class="`${selected ? 'bg-grey-8': 'bg-grey-4 '}`"
        @click="handleClick()"
        >
        <q-item-section 
        avatar
        :class="`${selected ? 'text-white': 'text-black '}`">
            <q-icon :name="icon" />
        </q-item-section>

        <q-item-section
        :class="`${selected ? 'text-white': 'text-black '}`"
        >
            {{name}}
        </q-item-section>
    </q-item>
</template>

<script setup>
const props = defineProps(["icon", "name", "selected"])
const emits = defineEmits(['handleClick'])
function handleClick(){
  emits('handleClick')
}
</script>