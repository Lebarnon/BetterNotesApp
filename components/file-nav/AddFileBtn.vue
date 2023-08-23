<template>
<q-btn
    icon="upload"
    label="Add files"
    no-caps
    class="q-mx-md q-my-md"
    style="border-radius: 10px;"
    @click="handleClick()"
/>
</template>

<script setup>
const emits = defineEmits(["handleClick"])
function handleClick(){
    emits("handleClick")
}
</script>