<template>
  <v-container class="pt-0" fluid height="calc(100vh - 12em)">
    <div v-if="errors.length" class="text-red pa-4">
      <p>Errors detected...</p>
      <li v-for="error in errors" :key="error">{{ error }}</li>
    </div>

    <vue-monaco-editor
      v-model:value="code"
      :theme="`qmk-${theme.global.name.value}`"
      language="json"
      :options="MONACO_EDITOR_OPTIONS"
      @mount="handleMount"
      @beforeMount="handleBeforeMount"
      @change="handleChange"
      @validate="handleError"
    />
  </v-container>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { useTheme } from "vuetify";
import { useKeymapState } from "@/composables/useKeymapState";
import { type MonacoEditor } from '@guolao/vue-monaco-editor';
import { API_BASE_URL } from '@/constants';

const theme = useTheme();
const { keymap } = useKeymapState();

const MONACO_EDITOR_OPTIONS = {
  automaticLayout: true,
  formatOnType: true,
  formatOnPaste: true,
  minimap: { enabled: false },
};

const code = computed({
  get() {
    return JSON.stringify(keymap.value, null, 4);
  },
  set(km_str) {
    try {
      const km = JSON.parse(km_str);
      keymap.value = km;
    } catch {
      // log?
    }
  },
});

const handleBeforeMount = (monacoInstance: MonacoEditor) => {
  const dark = {
    base: 'vs-dark',
    inherit: true,
    rules: [],
    colors: {
        'editor.background': '#1B1B1F',
    },
  };
  monacoInstance.editor.defineTheme('qmk-dark', dark);

  const light = {
    base: 'vs',
    inherit: true,
    rules: [],
    colors: {
      // nothing?
    },
  };
  monacoInstance.editor.defineTheme('qmk-light', light);
};

const handleMount = (editorInstance: any, monacoInstance: MonacoEditor) => {
  monacoInstance.languages.json.jsonDefaults.setDiagnosticsOptions({
    validate: true,
    enableSchemaRequest: true,
    schemaRequest: 'ignore',
    schemas: [
      {
        uri: `${API_BASE_URL}/schemas/keymap.jsonschema`,
        fileMatch: [editorInstance.getModel()?.uri.toString()]
      }
    ],
  });
};

const errors = ref<string[]>([]);

const handleChange = () => {
  // ??
};

const handleError = (markers: any[]) => {
  // console.log(markers);
  errors.value = markers.map((i) => `Line[${i.startLineNumber}] ${i.message}`);
};
</script>
