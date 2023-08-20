<template>
    <q-page style="position: relative;"> 
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
                <q-btn
                icon="upload"
                label="New"
                no-caps
                class="q-mx-md q-my-md"
                style="border-radius: 10px;"
                />
                <FileNavFileList style="width: 100%; height: auto; overflow-y: auto;"/>
            </div>
            <div class="col-9" :style="{'display': 'flex', 'flex-direction': 'column', 'max-height': '100%', 'justify-content': docStore.getSelectedDocument ? 'space-between' : 'flex-end'}">
                <div style="width: 100%; height: auto; overflow-y: auto;">
                    <div v-if="docStore.getSelectedDocument">
                        <FileDetails 
                            :data="docStore.getSelectedDocument" 
                            @handle-delete-click="docStore.deleteDoc(docStore.getSelectedDocument)"/>
                    </div>
                    <div v-else>
                        <ChatConversationWindow :conversation="colStore.conversation"/>
                    </div>
                </div>
                <div v-if="!docStore.getSelectedDocument" class="bg-primary" style="width: 100%;">
                    <q-form
                        @submit="handleFormSubmit()"
                        class="q-ma-xs"
                    >
                        <q-input
                            v-model="queryInput"
                            placeholder="Type a message..."
                        />
                    </q-form>
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
const queryInput = ref()

onBeforeMount(async () => {
    await colStore.setCollections()
})

function onDrop(acceptFiles, rejectReasons){
    for(const file of acceptFiles){
        docStore.uploadDocument(file)
    }
}

function handleFormSubmit(){
    if(queryInput.value.trim){
        colStore.askQuestion(queryInput.value)
    }
}

const { getRootProps, getInputProps, isDragActive, ...rest} = useDropzone({ onDrop, noClick:true })
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





