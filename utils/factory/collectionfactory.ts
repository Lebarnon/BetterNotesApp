import { serverTimestamp } from 'firebase/firestore'
import { AppCollection } from '~/types/types'

const fromFirestore = function (userFirestoreData: any){
    const collection: AppCollection = {
        ...userFirestoreData,
    }
    return collection
}

const defaulCollection = function (name: string){
    const newCollection: AppCollection = {
        id: "filler",
        name: name,
        dateCreated: serverTimestamp(),
        documents: [],
        icon: "assignment"
    }
    return newCollection
}

const collectionfactory = {
    fromFirestore,
    defaulCollection
}
export default collectionfactory