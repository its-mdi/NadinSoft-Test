/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
// @ts-ignore
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Styles
import 'unfonts.css'

//I18n
import { createI18n } from "vue-i18n";
import i18n from "@/plugins/i18n.ts";

const app = createApp(App)
app.use(i18n)

registerPlugins(app)

app.mount('#app')
