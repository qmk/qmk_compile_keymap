<template>
  <v-container class="pa-4" fluid style="height:85vh">
    <div>
      <!-- Editor actions -->
      <v-btn class="mb-4" append-icon="fa-solid fa-indent" @click="formatCode">Format</v-btn>
    </div>

    <p style="color:red" v-if="error">{{ error }}</p>

    <vue-monaco-editor
    v-model:value="code"
    :theme="theme.global.name.value === 'dark' ? 'vs-dark' : 'vs'"
    language="json"
    :options="MONACO_EDITOR_OPTIONS"
    @mount="handleMount"
    @change="handleChange"
    @validate="handleError"
  />
</v-container>
</template>

<script lang="ts" setup>
import { ref, shallowRef, computed } from 'vue'
import { useTheme } from "vuetify";
import { useTimeoutFn } from '@vueuse/core'
import { useKeymapState } from '@/composables/useKeymapState'

const theme = useTheme();
const { keymap } = useKeymapState()

const MONACO_EDITOR_OPTIONS = {
  automaticLayout: true,
  formatOnType: true,
  formatOnPaste: true,
  minimap: { enabled: false },
}

const code = computed({
  get() {
    return JSON.stringify(keymap.value, null, 4);
  },
  set(km_str) {
    try {
      const km = JSON.parse(km_str);
      keymap.value = km
    } catch (error) {
      // log?
    }
  }
})

const editor = shallowRef()
const handleMount = (editorInstance: any) => {
  editor.value = editorInstance;

  useTimeoutFn(() => {
    formatCode();
  }, 200)
}

const error = ref("")

// your action
const formatCode = () => {
  editor.value?.getAction('editor.action.formatDocument').run()
}

const handleChange= () => {
  // ??
}

const handleError= (markers: any[]) => {
  console.log(markers)
  error.value = markers.length ? "Errors detected..." : '';
}

</script>

