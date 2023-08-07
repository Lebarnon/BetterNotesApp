import { User } from 'firebase/auth'
import { Pinia } from 'pinia'
import { useCollectionsStore } from '~/store/collections'
import { useUserStore } from '~/store/user'

export default defineNuxtPlugin(async (nuxtApp) => {
    await useUserStore().initAuth()
})


function initAuth(auth: any) {
    return new Promise((resolve, reject) => {
        auth.onAuthStateChanged((user: User) => {
          if (user) {
            useUserStore().setUser(user)
          }
          return resolve(user)
        })
    })
}