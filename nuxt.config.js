import colors from 'vuetify/es5/util/colors'

require('dotenv').config()

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: titleChunk => {
      // If undefined or blank then we don't need the hyphen
      return titleChunk ? `${titleChunk} | Gem Media` : 'Gem Media'
    },
    htmlAttrs: {
      lang: 'en',
      amp: true
    },
    title: '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Social media website. Follow people, chat with them, post photos, like them, enjoj!'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    noscript: [{ innerHTML: 'This website requires JavaScript.' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: false,
  /*
   ** Global CSS
   */
  css: ['~/assets/main.scss'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxtjs/vuetify'],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/dotenv-module
    ['@nuxtjs/dotenv', { systemvars: true }],
    // Doc: https://auth.nuxtjs.org/
    '@nuxtjs/auth',
    // Doc: https://github.com/richardeschloss/nuxt-socket-io
    'nuxt-socket-io',
    // Doc: https://github.com/microcipcip/cookie-universal/tree/master/packages/cookie-universal-nuxt#readme
    'cookie-universal-nuxt'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: process.env.SERVER_URL
  },
  auth: {
    plugins: [`~/plugins/auth.js`],
    redirect: {
      login: '/sign-in',
      logout: '/sign-in',
      home: '/',
      callback: '/'
    },
    strategies: {
      local: {
        _scheme: 'refresh',
        token: {
          property: 'accessToken',
          type: 'Bearer',
          name: 'Authorization',
          maxAge: 30
        },
        refreshToken: {
          property: 'refreshToken',
          data: 'refreshToken',
          maxAge: 60
        },
        user: {
          property: 'user',
          autoFetch: true
        },
        clientId: false,
        grantType: false,
        autoRefresh: { enable: true },
        autoLogout: true,
        endpoints: {
          login: { url: '/auth/sign-in', method: 'post' },
          refresh: { url: '/auth/refresh-token', method: 'post' },
          user: { url: '/auth/user', method: 'get' },
          logout: { url: '/auth/logout', method: 'post' }
        }
      }
    }
  },
  io: {
    sockets: [
      {
        name: 'default',
        url: process.env.SERVER_URL,
        default: true,
        vuex: {
          mutations: [
            { 'remove online user': 'chat/REMOVE_ONLINE_PEOPLE' },
            { 'chat notification': 'user/ADD_NOTIFICATION' }
          ],
          actions: [
            { 'add online user': 'chat/addUserToOnlineUsers' },
            { 'new post created': 'feed/addNewPost' },
            { 'remove post': 'feed/removeFeedPost' },
            { 'update post': 'feed/updateFeedPost' }
          ]
        },
        namespaces: {
          '/chat': {}
        }
      }
    ]
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    options: {
      customProperties: true
    },
    theme: {
      lang: {
        current: 'en'
      },
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        },
        light: {}
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },
  router: {
    middleware: ['auth']
  }
}
