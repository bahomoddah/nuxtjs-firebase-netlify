const fs = require('fs')
export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,
  target: 'static',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'لوحة التحكم',
    htmlAttrs: {
      lang: 'ar'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'لوحة تحكم' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Sumaya369' },
      { hid: 'keywords', name: 'keywords', content: "لوحة تحكم" },
      { hid: 'author', name: 'author', content: 'krdc-app' },
      { hid: 'og-title', property: 'og:title', content: "لوحة تحكم" },
      { hid: 'og-description', property: 'og:description', content: "لوحة تحكم" },
      { hid: 'og-image', property: 'og:image', content: '~/assets/images/tools/nuxtjs-firebase.png' },
      { hid: "og-type", property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'krdc-app' },
      { name: 'robots', content: 'index, follow' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/logo.png' },
      { rel: 'stylesheet', href: 'https://unpkg.com/element-ui/lib/theme-chalk/index.css' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css' },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/style.css'
  ],

  loading: {
    color: '#108776'
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/element-ui'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/fontawesome',
  ],

  fontawesome: {
    component: 'fa',
    icons: {
      solid: true,
      brands: true
    }
  },
  
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
      apiKey: process.env.FIREBASE_API_KEY,
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
