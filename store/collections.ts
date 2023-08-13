import { defineStore } from 'pinia'
import { AppUser, AppCollection } from '@/types/types'
import { addDoc, arrayUnion, collection, getDocs, serverTimestamp, updateDoc } from 'firebase/firestore'
import collectionfactory from '@/utils/factory/collectionfactory'
import { useUserStore } from './user'
export const useCollectionsStore = defineStore('collections', {
  state: () => ({
    collections: [] as Array<AppCollection>,
    currentCollection: 0 as number,
  }),
  getters: {
    getUser(state) {
      const user = useUserStore().getUser
      if(!user){
        throw new Error("Please login to continue.")
      }
      return user
    },
    getCurrentCollection(state){
      if(state.collections.length==0){
        return null
      }
      if(state.collections.length <= state.currentCollection){
        state.currentCollection = 0
      }
      return state.collections[state.currentCollection]
    }
  },
  actions: {
    // subscribe to collections
    async setCollections(){
      const user = this.getUser
      const { $firestore } = useNuxtApp()
      // Query a reference to a subcollection
      const querySnapshot = await getDocs(collection($firestore, "users", user.uid, "collections"))
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        this.collections.push(collectionfactory.fromFirestore(doc.data()))
      });
    },
    async createCollection(name: string) {
      try {
        const user = this.getUser
        const { $firestore } = useNuxtApp()
        
        const newCollection:AppCollection = collectionfactory.defaulCollection(name)
        // You can define the object properties here. For example:
        const docRef = await addDoc(collection($firestore, "users", user.uid, "collections"), newCollection)
        await updateDoc(docRef, {
          id: docRef.id
        });
        Notify.create({message: "Created collection: " + name, color:'positive'})
        newCollection.id = docRef.id
        this.collections.push(newCollection)

        // Update the "collections" field in the "users" > user.uid collection with new doc id
        
      } catch (error) {
        console.error('Error creating collection:', error);
        Notify.create({message: "Error creating collection: " + error, color:'negative'})
      }
    },
  }
})