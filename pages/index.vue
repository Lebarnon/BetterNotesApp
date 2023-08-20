<template>
    <q-page class="row"> 
            <div class="bg-white q-ma-md" style="border-radius: 10px; width: 100%; max-height: 100vh;" v-bind="getRootProps()">
                <input v-bind="getInputProps()" />
                <div class="row" style="height: 10%;">
                    <div class="col-4">
                        <q-btn
                        icon="upload"
                        label="New"
                        no-caps
                        class="q-ml-md q-my-md col"
                        style="border-radius: 10px;"
                        />
                    </div>
                    <p v-if="isDragActive">Drop the files here ...</p>
                </div>
                <q-separator />
                <div class="row" style="max-height: 90%;">
                    <div class="col-4 ">
                        <q-scroll-area style="height: 100%;"  >
                            <FileNavFileList/>
                        </q-scroll-area>
                    </div>
                    <q-separator  vertical/>
                    <div class="col-7">
                        <q-scroll-area style="height: 70vh;">
                            <div v-if="docStore.getSelectedDocument">
                                <q-btn @click="docStore.deleteDoc(docStore.getSelectedDocument)">Delete</q-btn>
                                {{ docStore.getSelectedDocument }}
                            </div>
                            <div v-else style="overflow-y: scroll; height: 100%;">
                                <div v-for="convo in colStore.conversation"> 
                                    <div>Question: {{ convo.question }}</div>
                                    <div>Answer: {{ convo.answer }}</div>
                                </div>
                            </div>
                        </q-scroll-area>
                            <div class="bg-primary">
                                <q-form
                                    @submit="handleFormSubmit()"
                                >
                                    <q-input
                                        v-model="queryInput"
                                        placeholder="Type a message..."
                                    />
                                </q-form>
                            </div>
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
</style>
  
<style scoped>

.chat-messages {
  flex: 0 0 100%;
  overflow-y: auto;
  padding: 10px;
}

.message {
  background-color: #f0f0f0;
  padding: 5px 10px;
  border-radius: 5px;
  margin: 5px 0;
}

.input-bar {
    position: fixed; 
    bottom:0%;
    width:100%;  
}
</style>





