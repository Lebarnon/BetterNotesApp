import { serverTimestamp } from 'firebase/firestore'
import { AppDocument } from '~/types/types'

const fromFirestore = function (userFirestoreData: any){
    const newDoc: AppDocument = {
        ...userFirestoreData,
    }
    return newDoc
}

const defaultDocument = function (file: Blob | File){
    const newDoc: AppDocument = {
        id: "filler",
        name: file.name,
        type: file.type,
        size: file.size,
        dateCreated: serverTimestamp(),
        icon: "assignment",
        downloadURL: ""
    }
    return newDoc
}

const documentfactory = {
    fromFirestore,
    defaultDocument
}
export default documentfactory