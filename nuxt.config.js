export default {
  ssr: false,
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s - AGAS',
    title: 'AGAS innovation environment',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'og:title',
        name: 'og:title',
        content: 'AGAS'
      },
      {
        hid: 'og:description',
        name: 'og:description',
        content: 'innovation environment'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'innovation environment'
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: `${process.env.BASE_URL}/logo.png`
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  loading: {
    color: '#1e88e5'
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['~/assets/main.scss'],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,
  router: {
    prefetchLinks: false
  },

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/dotenv'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/auth',
    [
      'nuxt-i18n',
      {
        locales: [
          {
            name: 'עברית',
            code: 'he',
            flag: 'isr',
            file: 'he.js',
            dir: 'rtl'
          },
          {
            name: 'Русский',
            code: 'ru',
            flag: 'ru',
            file: 'ru.js',
            dir: 'ltr'
          },
          {
            name: 'English',
            code: 'en',
            flag: 'gb',
            file: 'en.js',
            dir: 'ltr'
          }
        ],
        vueI18n: {
          fallbackLocale: 'he'
        },
        lazy: true,
        langDir: 'assets/lang/',
        defaultLocale: 'he'
      }
    ],
    '@nuxtjs/dayjs',
    '@nuxtjs/gtm',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots'
  ],
  sitemap: {
    path: '/sitemap.xml',
    hostname: 'http://agas.cloud',
    cacheTime: 1000 * 60 * 15,
    gzip: true,
    generate: false,
    exclude: [
      '/login',
      '/**/login',
      '/signup',
      '/**/signup',
      '/notifications',
      '/**/notifications',
      '/barting',
      '/**/barting',
      '/UsersProfile',
      '/**/UsersProfile',
      '/profile',
      '/**/profile'
    ]
  },
  robots: {
    Useragent: '*',
    Allow: '/',
    Disallow: [
      '/login',
      '/*/login',
      '/signup',
      '/*/signup',
      '/notifications',
      '/*/notifications',
      '/barting',
      '/*/barting',
      '/UsersProfile',
      '/*/UsersProfile',
      '/profile',
      '/*/profile'
    ],
    Sitemap: `${process.env.BASE_URL}/sitemap.xml`
  },
  gtm: {
    id: process.env.GTM_ID,
    scriptDefer: true,
    pageTracking: true,
    enabled: process.env.IS_PROD || false
  },
  dayjs: {
    locales: ['en', 'ru', 'he'],
    defaultLocale: 'he',
    plugins: ['relativeTime']
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: `${process.env.API}/api/login`,
            method: 'post',
            propertyName: 'token'
          },
          redirect: {
            login: '/login',
            logout: false,
            home: false
          },
          logout: false,
          user: false
        }
      }
    },
    plugins: ['@/plugins/auth.js', '@/plugins/authRedirect.js']
  },

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '@/plugins/day.js',
    '@/plugins/api.js',
    '@/plugins/api_board.js',
    '@/plugins/apiLearning.js',
    '@/plugins/socket.client.js'
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    proxy: true
    // credentials: false
    // https: true
  },

  proxy: {
    '/apiLearning/': {
      target: `${process.env.LEARNING_API}`,
      changeOrigin: true
    },
    '/api/': { target: `${process.env.API}`, changeOrigin: true },
    '/api_board/': {
      target: `${process.env.BOARD_API}`,
      changeOrigin: true
    }
  },

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    optionsPath: './vuetify.options.js'
  },
  server: {
    port: 3000,
    host: '127.0.0.1'
  },
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    extend(config, ctx) {
      config.module.rules.push({
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: /(node_modules)/,
        options: {
          fix: true
        }
      })
    },
    loaders: { imgUrl: { esModule: false } }
  }
}
