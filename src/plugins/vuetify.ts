/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import {fa} from 'vuetify/locale'
// Composables
import {createVuetify} from 'vuetify'
const userLang = localStorage.getItem('lang')
// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  locale: {
    locale: localStorage.getItem('lang') || 'en', // Set active locale
    messages: {fa},
    rtl: {
      fa: true,
      en: false,
    },
  },
  theme: {
    defaultTheme: localStorage.getItem('theme') || 'light',
  },
})

