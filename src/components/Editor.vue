<template>
  <v-container class="pt-0" fluid style="height:84vh">
          <!-- Editor actions -->
    <div class="text-red pa-4" v-if="errors.length">
      <p>Errors detected...</p>
      <li v-for="error in errors">{{ error }}</li>
    </div>

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
import { ref, computed } from "vue";
import { useTheme } from "vuetify";
import { useKeymapState } from "@/composables/useKeymapState";

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
    } catch (error) {
      // log?
    }
  },
});

const handleMount = (editorInstance: any, monacoInstance: any) => {
  monacoInstance.languages.json.jsonDefaults.setDiagnosticsOptions({
    validate: true,
    enableSchemaRequest: true,
    schemaRequest: 'ignore',
    schemas: [
      {
        uri: 'https://keyboards.qmk.fm/v1/schemas/keymap.jsonschema',
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
