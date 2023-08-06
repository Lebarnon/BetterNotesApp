import { defineStore } from 'pinia'
import { Collection } from '@/types/types'
export const useCollectionsStore = defineStore('collections', {
  state: () => ({
    collections: null as null | Collection,
  }),
  actions: {}
})