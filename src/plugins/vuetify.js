import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import pt from 'vuetify/es5/locale/pt'

Vue.use(Vuetify)

const colors = {
  primary: '#AA6A51',
  secondary: '#AC7C00',
  accent: '#FCFCFC',
  error: '#FF5252',
  info: '#2196F3',
  success: '#4CAF50',
  warning: '#FFC107',
}

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        ...colors,
      },
      dark: {
        ...colors,
        accent: '#333',
        secondary: '#8E6500',
      },
    },
  },
  lang: {
    locales: { pt },
    current: 'pt',
  },
})
