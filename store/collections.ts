import { defineStore } from 'pinia'
import { AppUser, Collection } from '@/types/types'
import { addDoc, arrayUnion, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
export const useCollectionsStore = defineStore('collections', {
  state: () => ({
    collections: null as null | Collection,
  }),
  actions: {
    setCollections(user: AppUser){
    },
    async createCollection(user: AppUser, name: string) {
      try {
        const { $firestore } = useNuxtApp()
        const userRef = doc($firestore, "users", user.uid)
        
        const newCollection = {
          name: name,
          dateCreated: serverTimestamp(),
          documents: []
        }
        // You can define the object properties here. For example:
        const docRef = await addDoc(collection($firestore, "documents"), newCollection)


        // Update the "collections" field in the "users" > user.uid collection with new doc id
        await updateDoc(userRef, {
          collections: arrayUnion(docRef.id)
        })
      } catch (error) {
        console.error('Error creating collection:', error);
        Notify.create({message: "Error creating collection: " + error, color:'negative'})
      }
    },
  }
})