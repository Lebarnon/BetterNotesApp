// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    'nuxt-quasar-ui',
    '@pinia/nuxt'
  ],
  quasar: { /* */ },
  runtimeConfig:{
    public: {
      apiKey: '',
      authDomain: '',
      projectId: '',
      storageBucket: '',
      messagingSenderId: '', 
      appId: '',
      measurementId: '',
    }
  },

})
