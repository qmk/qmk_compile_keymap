import '@fortawesome/fontawesome-free/css/all.css'
import 'vuetify/styles'
import { aliases, fa } from 'vuetify/iconsets/fa'
import { createVuetify } from 'vuetify'

export default createVuetify({
  icons: {
    defaultSet: 'fa',
    aliases,
    sets: {
      fa,
    },
  },
  defaults: {
    VMain: {
      VSwitch: { color: 'primary', density: 'compact', class: 'pl-4' },
      VSelect: { density: 'compact' },
      VNumberInput: { density: 'compact' }
    }
  },
  theme: {
    defaultTheme: 'dark',
    themes: {
      dark: {
        colors: {
          background: 'rgb(27, 27, 31)',
          surface: 'rgb(22, 22, 24)',
          primary: 'rgb(62, 99, 221)',

          "on-background": 'rgba(255, 255, 245, 0.86)',
          "on-surface": 'rgba(255, 255, 245, 0.86)',
        },
      },
    },
  },
})
