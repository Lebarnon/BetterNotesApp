
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  modules: [
    'nuxt-quasar-ui',
    '@pinia/nuxt'
  ],
  quasar: { 
    plugins: [
      'Notify'
    ],
    config: {
      brand: {
        primary: '#F2F2F2',
        secondary: '#26A69A',
        accent: '#9C27B0',

        dark: '#1d1d1d',
        // @ts-ignore
        'dark-page': '#121212',

        positive: '#21BA45',
        negative: '#C10015',
        info: '#31CCEC',
        warning: '#F2C037'
      }
    }
  },
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
