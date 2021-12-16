const fs = require('fs')
export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'test-nuxt',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/static/logo.png' },
      { rel: 'stylesheet', href: 'https://unpkg.com/element-ui/lib/theme-chalk/index.css' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/style.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/element-ui'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],
  
  router: {
    middleware: ['auth']
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/firebase',
    '@nuxtjs/axios'
  ],

  
  firebase: {
    config: {
      // Later put FIREBASE_API_KEY in .env if necessary,
      apiKey: 'AIzaSyBb5VX2HBbFUA03yv0NRbsZQpYFRTp6ScM',
      authDomain: 'test-nuxt-63bd6.firebaseapp.com',
      projectId: 'test-nuxt-63bd6',
      storageBucket: 'test-nuxt-63bd6.appspot.com',
      messagingSenderId: '552361769137',
      appId: '1:552361769137:web:b8ba59a5fc9ba1f38f4a90',
      measurementId: 'G-LBD8B8FVKW'
    },
    onFirebaseHosting: false,
    services: {
      auth: {
        persistence: 'local',
        initialize: {
          onAuthStateChangedAction: 'onAuthStateChanged',
          subscribeManually: false
        },
        ssr: true
      },
      firestore: true
    }
  },
  server: {
    port: 5000,
    host: '0.0.0.0'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

}
