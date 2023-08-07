import { Pinia } from 'pinia'
import { useCollectionsStore } from '~/store/collections'
import { useUserStore } from '~/store/user'

export default defineNuxtPlugin(({ $pinia }) => {
  return {
    provide: {
      collectionStore: useCollectionsStore($pinia as Pinia),
      userStore: useUserStore($pinia as Pinia),
    }
  }
})
