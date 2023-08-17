import { initializeApp } from 'firebase/app' 
import { connectAuthEmulator, getAuth } from "firebase/auth"
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore' 
import { getAnalytics } from "firebase/analytics"
import { connectStorageEmulator, getStorage } from "firebase/storage";

export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig()
    console.log(config.public.apiKey)
    const firebaseConfig = {
        apiKey: config.public.apiKey,
        authDomain: config.public.authDomain,
        projectId: config.public.projectId,
        storageBucket: config.public.storageBucket,
        messagingSenderId: config.public.messagingSenderId, 
        appId: config.public.appId,
        measurementId: config.public.measurementId,
    }
    const app = initializeApp(firebaseConfig)
    const analytics = getAnalytics(app) 
    const auth = getAuth(app)
    const firestore = getFirestore(app)
    const storage = getStorage(app)
    
    connectFirestoreEmulator(firestore, '127.0.0.1', 8080);
    connectStorageEmulator(storage, '127.0.0.1', 9199);
    connectAuthEmulator(auth, 'http://127.0.0.1:9099')
    // connect to emulator
    // nuxtApp.vueApp.provide('auth', auth)
    // nuxtApp.provide('auth', auth)

    // nuxtApp.vueApp.provide('firestore', firestore)
    // nuxtApp.provide('firestore', firestore)
    return {
        provide:{
            auth,
            firestore,
            storage
        }
    }
})