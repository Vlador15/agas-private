import colors from 'vuetify/es5/util/colors'
import ru from 'vuetify/es5/locale/ru'
import he from 'vuetify/es5/locale/he'

export default {
  customVariables: ['~/assets/variables.scss'],
  lang: {
    locales: { ru, he },
    current: 'he'
  },
  icons: {
    iconfont: 'mdi'
  },
  theme: {
    themes: {
      light: {
        primary: colors.blue.darken1,
        secondary: colors.blue.lighten4,
        accent: colors.blue.accent4
      }
    }
  }
}
