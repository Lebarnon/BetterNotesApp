import { defineStore } from 'pinia'
import { AppCollection, AppDocument } from '@/types/types'
import { addDoc, arrayUnion, collection, deleteDoc, doc, getDocs, onSnapshot, serverTimestamp, updateDoc } from 'firebase/firestore'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import collectionfactory from '@/utils/factory/collectionfactory'
import { useUserStore } from './user'
import { useCollectionsStore } from './collections';
import documentfactory from '@/utils/factory/documentfactory';
export const useDocumentsStore = defineStore('documents', {
  state: () => ({
    documents: [] as Array<AppDocument>,
    selectedDocument: null as AppDocument | null,
    prevSubscription: null as any
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
      return col
    },
    getDocuments(state){
      return state.documents
    },
    getSelectedDocument(state){
      return state.selectedDocument
    },
    isDocumentSelect(state){
      return (appDocument: AppDocument) => appDocument.id == this.selectedDocument?.id
    }
  },
  actions: {
    // subscribe to collections
    async setDocuments(){
      try{
        const {$firestore} = useNuxtApp()
        // unsubscribe to previous if needed
        if(this.prevSubscription){
          this.prevSubscription()
        }
        // reset documents
        this.$reset()

        const curCollection = this.getCollection
        if(curCollection == null){
          throw new Error("No Collection Selected")
        }
        const user = this.getUser
        const collectionRef = collection($firestore, "users", user.uid, "collections", curCollection.id, "documents")


        const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
          snapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
              this.addDocumentToState(curCollection.id, change.doc.id, documentfactory.fromFirestore(change.doc.data()));
            }
            if (change.type === "modified") {
              console.log("modified called")
              this.updateDocumentInState(curCollection.id, documentfactory.fromFirestore(change.doc.data()));
            }
            if (change.type === "removed") {
              this.deleteDocumentInState(curCollection.id, documentfactory.fromFirestore(change.doc.data()));
            }
          });
        });

        return unsubscribe

      }catch(error){
        Notify.create({message: ""+error, color:"negative"})
      }
    },
    async uploadDocument(file: Blob | File) {
        try{
            const {$firestore, $storage} = useNuxtApp()
            const curCollection = this.getCollection
            if(curCollection == null){
              throw new Error("No Collection Selected")
            }
            const user = this.getUser

            // Create the file metadata
            /** @type {any} */
            const metadata = {
              contentType: file.type
            };
            // Upload file and metadata to the object 'images/mountains.jpg'
            const docRef = await addDoc(collection($firestore, "users", user.uid, "collections", curCollection.id, "documents"), documentfactory.defaultDocument(file));
            const storageRef = ref($storage, `${user.uid}/documents/${curCollection.id}/${docRef.id}`);
            
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
                deleteDoc(docRef)
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
                updateDoc(docRef, {
                  id: docRef.id,
                  downloadURL: downloadURL
                });
              }
            );
        }catch(error){
            console.error("Failed to upload file: " + error)
            Notify.create({message:"Failed to upload file: " + error, color:"negative"})
        }
    },
    async deleteDoc(appDocument: AppDocument){
      try{
        const {$firestore} = useNuxtApp()
        const curCollection = this.getCollection
          if(curCollection == null){
            throw new Error("No Collection Selected")
          }
          const user = this.getUser
        deleteDoc(doc($firestore, "users", user.uid, "collections", curCollection.id, "documents", appDocument.id))
        if(this.selectedDocument?.id == appDocument.id){
          this.selectedDocument=null
        }
      }catch(error){
        console.error(error)
        Notify.create({message: "Failed to delete file:"+error, color:"negative"})
      }
    },
    setSelectedDocument(appDocument: AppDocument | null){
      this.selectedDocument = appDocument
    },
    addDocumentToState(collectionId: string, appDocumentId: string, appDocument: AppDocument){
      appDocument.id = appDocumentId;
      this.documents.push(appDocument);
    },
    updateDocumentInState(collectionId: string, appDocument:AppDocument){
      const index = this.documents.findIndex((el) => el.id == appDocument.id)
      if(index != -1){
        this.documents.splice(index, 1, documentfactory.fromFirestore(appDocument))
      }
    },
    deleteDocumentInState(collectionId: string, appDocument: AppDocument){
      const index = this.documents.findIndex((el) => el.id == appDocument.id)
      if(index != -1){
        this.documents.splice(index,1)
      }
    }
  }
})