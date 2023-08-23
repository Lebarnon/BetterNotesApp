<template>
<q-page> 
    <div class="bg-white q-ma-md child row" style="border-radius: 10px; overflow: hidden;" v-bind="getRootProps()">
        <input v-bind="getInputProps()"/>
        <Transition name="fade">
            <div v-if="isDragActive" class="dropzone" transition>
                <div class="text-center ">
                    <q-icon name="upload" size="5rem" color="grey-9"></q-icon>
                    <p class="text-h4">Drop files here to upload...</p>
                </div>
            </div>
        </Transition>
        <div class="col-3" style="border-right: 1px solid rgba(0, 0, 0, 0.12); display: flex; flex-direction: column; max-height: 100%;">
            <FileNavAddFileBtn @handle-click="open"/>
            <!-- <q-btn @click="clearVectors">clear</q-btn> -->
            <FileNavFileList style="width: 100%; height: auto; overflow-y: auto;"/>
        </div>
        <div class="col-9" :style="{'display': 'flex', 'flex-direction': 'column', 'max-height': '100%', 'justify-content': docStore.getSelectedDocument ? 'space-between' : 'flex-end'}">
            <div ref="convowindow" style="width: 100%; height: auto; overflow-y: auto;">
                <div v-if="docStore.getSelectedDocument">
                    <FileDetails 
                        :data="docStore.getSelectedDocument" 
                        @handle-delete-click="docStore.deleteDoc(docStore.getSelectedDocument)"/>
                </div>
                <div v-else>
                    <ChatConversationWindow :conversation="colStore.conversation"/>
                </div>
            </div>
            <div style="width: 100%;">
                <ChatInputBar @handle-form-submit="(question) => handleQuestionSubmit(question)"/>
            </div>
        </div>
    </div>
</q-page>
</template>

<script setup>
import { useCollectionsStore } from '@/store/collections';
import { useDocumentsStore } from '@/store/documents';
import { useDropzone } from "vue3-dropzone";
const docStore = useDocumentsStore()
const colStore = useCollectionsStore()
const $q = useQuasar()
const convowindow = ref()

onBeforeMount(async () => {
    await colStore.setCollections()
})

async function onDrop(acceptFiles, rejectReasons){
    const total = acceptFiles.length + rejectReasons.length
    const accepted = acceptFiles.length
    const typeAccepted = "PDF"
    $q.notify({
        message: `Uploading ${accepted}/${total} files. ${rejectReasons.length > 0 ? `Only ${typeAccepted} files are accepted` : ''}`
    })
    for(const file of acceptFiles){
       await docStore.uploadDocument(file)
    }
}

async function handleQuestionSubmit(question){
    if(question.trim() != ""){
       await colStore.askQuestion(question)
    }
}

watch(() => colStore.conversation, async (cur, prev) => {
    nextTick(()=>scrollToBottom())
},{deep:true})

function scrollToBottom(){
    const container = convowindow.value; // Replace 'convowindow' with the actual ID of your container element
    container.scrollTo({
        top: container.scrollHeight,
        // behavior: 'smooth'
    });
}

const { getRootProps, getInputProps, isDragActive, open,...rest} = useDropzone({ onDrop, noClick:true, accept:['application/pdf']})
</script>

<style>
.firebase-emulator-warning {
  background-color: transparent !important;
  border: none !important;
  color: rgba(245, 66, 66, 0.3) !important;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
  
<style scoped>
.dropzone {
    position: absolute; 
    width: 100%; 
    height: 100%; 
    z-index: 2; 
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.35);
    backdrop-filter: blur(2px);
    display: flex; justify-content: center; align-items: center;
}
.child {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 96%;
    background-color: #ccc;
}

</style>





