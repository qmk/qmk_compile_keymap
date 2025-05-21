<template>
  <v-container class="pb-0">
    <div class="d-flex">
        
      <v-autocomplete v-model="keyboard" @update:modelValue="loadDefaultKeymap" clearable density="compact" label="Default Keymap..." :items="keyboard_list"/>
  
      <v-spacer/>
      
      <v-btn-group class="mb-4" variant="tonal" density="compact" divided>
        <v-btn @click="importKeymap">
          <v-icon>fa-solid fa-upload</v-icon>
        </v-btn>
        <v-btn readonly>keymap.json</v-btn>
        <v-btn @click="exportKeymap">
          <v-icon>fa-solid fa-download</v-icon>
        </v-btn>
      </v-btn-group>
    </div>
  </v-container>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useFetch } from "@vueuse/core";
import { useKeyboardList } from '@/composables/useKeyboardList'
import { useKeymapState } from "@/composables/useKeymapState";
import { saveAs } from "file-saver";
import defaultKeymap from '@/assets/keymap.json'

const { keymap } = useKeymapState();
const { data: keyboard_list } = await useKeyboardList();

const keyboard = ref();

const loadDefaultKeymap = async () => {
  if (!keyboard.value) {
    keymap.value = JSON.parse(JSON.stringify(defaultKeymap));
    return;
  }

  const kb = keyboard.value.replaceAll('/', '_');
  await useFetch(`https://raw.githubusercontent.com/qmk/qmk_configurator/refs/heads/master/public/keymaps/${kb[0]}/${kb}_default.json`, {
    afterFetch(ctx) {
      keymap.value = ctx.data;
      return ctx;
    },
  }).get().json();
};

const importKeymap = () => {
  // TODO: find npm FileReader.readAsText lib like file-saver
  const i = document.createElement("input");
  i.type = "file";
  i.accept = ".json";
  // eslint-disable-next-line func-names
  i.onchange = function (event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (!files || !files.length) {
      return;
    }

    const file = files[0];
    const fr = new FileReader();
    fr.onload = () => {
      const km = JSON.parse(fr.result as string);
      keymap.value = km;
    };

    fr.readAsText(file);
  };
  i.click();
};

const exportKeymap = () => {
  const km_str = JSON.stringify(keymap.value, null, 4);
  console.log(km_str);
  var blob = new Blob([km_str], { type: "text/plain;charset=utf-8" });

  saveAs(blob, "keymap.json");
};

</script>
