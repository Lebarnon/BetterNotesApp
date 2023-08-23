import { defineStore } from 'pinia'
import { AppUser, AppCollection } from '@/types/types'
import { addDoc, arrayUnion, collection, getDocs, onSnapshot, serverTimestamp, updateDoc } from 'firebase/firestore'
import collectionfactory from '@/utils/factory/collectionfactory'
import { useUserStore } from './user'
import { useDocumentsStore } from './documents'

const queryEndpoint = "http://127.0.0.1:5001/better-notes-b6af7/asia-southeast2/query"

export const useCollectionsStore = defineStore('collections', {
  state: () => ({
    collections: [] as Array<AppCollection>,
    selectedCollection: null as AppCollection | null,
    unsubscribes: [] as any[],
    conversation: [] as any[],
    conversationSub: null as any,
  }),
  getters: {
    getUser(state) {
      const user = useUserStore().getUser
      if(!user){
        throw new Error("Please login to continue.")
      }
      return user
    },
    getSelectedCollection(state){
      return state.selectedCollection
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
    async setConversation(){
      const user = this.getUser
      const { $firestore } = useNuxtApp()
      const curCollection = this.selectedCollection
      if(curCollection == null){
        throw new Error("No Collection Selected")
      }
      this.conversation = []
      const convesartionRef = collection($firestore, "users", user.uid, "collections", curCollection.id, "conversations")
      const unsubscribe = onSnapshot(convesartionRef, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            this.conversation.push({id: change.doc.id ,...change.doc.data()})
          }
          if (change.type === "modified") {
            const modifiedIndex = this.conversation.findIndex(el => el.id == change.doc.id)
            this.conversation.splice(modifiedIndex, 1, {id: change.doc.id ,...change.doc.data()})
          }
          if (change.type === "removed") {
            const modifiedIndex = this.conversation.findIndex(el => el.id == change.doc.id)
            this.conversation.splice(modifiedIndex, 1)
          }
        });
      });
      this.conversationSub = unsubscribe
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
        this.changeSelectedCollection(newCollection)
      } catch (error) {
        console.error('Error creating collection:', error);
        Notify.create({message: "Error creating collection: " + error, color:'negative'})
      }
    },
    changeSelectedCollection(newCollection: AppCollection){
      // Dont have to change collection if already selected
      if(this.selectedCollection?.id == newCollection.id) return
      this.selectedCollection = newCollection
      if(this.conversationSub != null) this.conversationSub()
      this.setConversation()
      useDocumentsStore().setDocuments()
    },
    async askQuestion(question: string){
      if(this.selectedCollection == null) {
        Notify.create({message: "Please create or select a collection first..."})
        return
      }
      // get from database
      try {
        const user = this.getUser
        const { $firestore } = useNuxtApp()
        // You can define the object properties here. For example:
        const docRef = await addDoc(collection($firestore, "users", user.uid, "collections", this.selectedCollection.id, "conversations"), {
          question: question,
          dateCreated: serverTimestamp(),
        })
        useDocumentsStore().selectedDocument = null
        // Notify.create({message: "Question Asked" + name, color:'positive'})
        // Update the "collections" field in the "users" > user.uid collection with new doc id
        
      } catch (error) {
        console.error('Error asking question:', error);
        Notify.create({message: "Error asking question: " + error, color:'negative'})
      }
    }
  }
})