<template>
    <q-page class="row"> 
          
            <div class="bg-white q-ma-md" style="border-radius: 10px; width: 100%; max-height: 100%;" v-bind="getRootProps()">
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
                <div class="row" style="height: 90%;">
                    <div class="col-4 ">
                        <q-scroll-area style="height: 100%;"  >
                            <FileNavFileList/>
                        </q-scroll-area>
                    </div>
                    <q-separator  vertical/>
                    test
                </div>
            </div>
    </q-page>
</template>

<script setup>
import { useCollectionsStore } from '@/store/collections';
import { useDocumentsStore } from '@/store/documents';
import { useDropzone } from "vue3-dropzone";
onMounted(() => {
    useCollectionsStore().setCollections()
})

function onDrop(acceptFiles, rejectReasons){
    for(const file of acceptFiles){
        useDocumentsStore().uploadDocument(file)
    }
}

const { getRootProps, getInputProps, isDragActive, ...rest} = useDropzone({ onDrop, noClick:true })


function onAddFiles() {
    console.log("on add files called")
}
</script>
  