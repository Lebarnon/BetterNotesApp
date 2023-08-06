import { Pinia } from 'pinia'
import { useMainStore } from '~/store'

export default defineNuxtPlugin(({ $pinia }) => {
  return {
    provide: {
      store: useMainStore($pinia as Pinia)
    }
  }
})
