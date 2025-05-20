import { registerPlugins } from '@/plugins'
import { install as VueMonacoEditorPlugin } from '@guolao/vue-monaco-editor'

import App from './App.vue'

import { createApp } from 'vue'

const app = createApp(App)

registerPlugins(app)

app.use(VueMonacoEditorPlugin, {
  paths: {
    // You can change the CDN config to load other versions
    vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.52.2/min/vs'
  },
})

app.mount('#app')
