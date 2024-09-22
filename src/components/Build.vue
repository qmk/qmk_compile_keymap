<template>
  <v-switch :hide-details="true" label="LTO" v-model="lto"/>
</template>
  
<script lang="ts" setup>
  import { computed } from 'vue'
  import { useKeymapState } from '@/composables/useKeymapState'
  
  const { keymap } = useKeymapState()
  
  const lto = computed({
    get() {
      return keymap.value.config?.build?.lto ?? false;
    },
    set(val) {
      if (val) {
        keymap.value.config = keymap.value.config || {}
        keymap.value.config.build = keymap.value.config.build || {}
        keymap.value.config.build.lto = val;
      } else {
        // TODO: delete actual value and clean up empty parents
        delete keymap.value?.config?.build;
      }
    }
  })
  
  </script>
  