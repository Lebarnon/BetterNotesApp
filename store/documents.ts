import { defineStore } from 'pinia'
import { AppCollection } from '@/types/types'
import { addDoc, arrayUnion, collection, getDocs, serverTimestamp, updateDoc } from 'firebase/firestore'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import collectionfactory from '@/utils/factory/collectionfactory'
import { useUserStore } from './user'
export const useCollectionsStore = defineStore('collections', {
  state: () => ({
    collections: [] as Array<AppCollection>,
  }),
  getters: {
    getUser(state) {
      const user = useUserStore().getUser
      if(!user){
        throw new Error("Please login to continue.")
      }
      return user
    }
  },
  actions: {
    // subscribe to collections
    async setDocuments(){

    },
    async uploadDocument(file: Blob | File) {
        try{

            const storage = getStorage();
    
            // Create the file metadata
            /** @type {any} */
            const metadata = {
              contentType: 'image/jpeg'
            };
            
            // Upload file and metadata to the object 'images/mountains.jpg'
            const storageRef = ref(storage, 'images/' + file.name);
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
              () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                  console.log('File available at', downloadURL);
                });
              }
            );
        }catch(error){
            console.error("Failed to upload file")
            Notify.create({message:"Failed to upload file", color:"negative"})
        }
    },
  }
})