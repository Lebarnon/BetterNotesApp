import { Pinia } from 'pinia'
import { useDocumentsStore } from '~/store/documents'
import { useCollectionsStore } from '~/store/collections'
import { useUserStore } from '~/store/user'

export default defineNuxtPlugin(({ $pinia }) => {
  return {
    provide: {
      collectionsStore: useCollectionsStore($pinia as Pinia),
      userStore: useUserStore($pinia as Pinia),
      documentsStore: useDocumentsStore($pinia as Pinia),
    }
  }
})
