import { defineStore } from 'pinia'
import { AppCollection, AppDocument } from '@/types/types'
import { addDoc, arrayUnion, collection, doc, getDocs, serverTimestamp, updateDoc } from 'firebase/firestore'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import collectionfactory from '@/utils/factory/collectionfactory'
import { useUserStore } from './user'
import { useCollectionsStore } from './collections';
import documentfactory from '@/utils/factory/documentfactory';
export const useDocumentsStore = defineStore('documents', {
  state: () => ({
    documents: {} as {[collectionId: string ]: Array<AppDocument>;},
  }),
  getters: {
    getUser(state) {
      const user = useUserStore().getUser
      if(!user){
        throw new Error("Please login to continue.")
      }
      return user
    },
    getCollection(state){
      const col: AppCollection | null = useCollectionsStore().getSelectedCollection
      if(col == null){
        throw new Error("No Collection Selected")
      }
      return col
    },
    getDocuments(state){
      const curCollection = useCollectionsStore().getSelectedCollection
      if(curCollection){
        return curCollection.id in state.documents ? state.documents[curCollection.id] : null
      }
      return null
    }
  },
  actions: {
    // subscribe to collections
    async fetchDocuments(){
      try{
        const {$firestore, $storage} = useNuxtApp()
        const curCollection = this.getCollection
        const user = this.getUser
        if(curCollection.id in this.documents){
          return
        }
        const querySnapshot = await getDocs(collection($firestore, "users", user.uid, "collections", curCollection.id, "documents"))
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          this.addDocumentToState(curCollection.id,documentfactory.fromFirestore(doc.data()));
        });
      }catch(error){
        console.error(error)
        Notify.create({message: ""+error, color:"negative"})
      }
    },
    async uploadDocument(file: Blob | File) {
        try{
            const {$firestore, $storage} = useNuxtApp()
            const curCollection = this.getCollection
            const user = this.getUser


            // Create the file metadata
            /** @type {any} */
            const metadata = {
              contentType: file.type
            };
            // Upload file and metadata to the object 'images/mountains.jpg'
            const storageRef = ref($storage, `${user.uid}/${curCollection.id}/${file.name}`);
            
            
            doc($firestore, "users", user.uid);
            const uploadTask = uploadBytesResumable(storageRef, file, metadata);
            
            // Listen for state changes, errors, and completion of the upload.
            uploadTask.on('state_changed',
              (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                  case 'paused':
                    console.log('Upload is paused');
                    break;
                  case 'running':
                    console.log('Upload is running');
                    break;
                }
              }, 
              (error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                  case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;
                  case 'storage/canceled':
                    // User canceled the upload
                    break;
            
                  // ...
            
                  case 'storage/unknown':
                    // Unknown error occurred, inspect error.serverResponse
                    break;
                }
              }, 
              async () => {
                // Upload completed successfully, now we can get the download URL
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
                const docRef = await addDoc(collection($firestore, "users", user.uid, "collections", curCollection.id, "documents"), documentfactory.defaultDocument(file));
                updateDoc(docRef, {
                  id: docRef.id,
                  downloadURL: downloadURL
                });
                const newAppDoc = documentfactory.defaultDocument(file)
                newAppDoc.id = docRef.id
                newAppDoc.downloadURL = downloadURL
                this.addDocumentToState(curCollection.id, newAppDoc)
              }
            );
        }catch(error){
            console.error("Failed to upload file")
            Notify.create({message:"Failed to upload file", color:"negative"})
        }
    },
    addDocumentToState(collectionId: string, appDocument: AppDocument){
      (this.documents[collectionId] ??= []).push(appDocument);
    }
  }
})