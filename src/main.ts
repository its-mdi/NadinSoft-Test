import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community'
ModuleRegistry.registerModules([AllCommunityModule])

import { registerPlugins } from '@/plugins'
import App from './App.vue'
import { createApp } from 'vue'
import '@/styles/main.scss'
import '@/styles/ag-grid-custom.scss'

const app = createApp(App)

registerPlugins(app)

app.mount('#app')
