<template>
  <v-switch :hide-details="true" label="Extra" v-model="extrakey"/>
  <v-switch :hide-details="true" label="Mouse" v-model="mousekey"/>
  <v-switch :hide-details="true" label="VIA" v-model="via"/>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useKeymapState } from '@/composables/useKeymapState'

const { keymap } = useKeymapState()

const extrakey = computed({
  get() {
    return keymap.value.config?.features?.extrakey ?? false;
  },
  set(val) {
    keymap.value.config = keymap.value.config || {}
    keymap.value.config.features = keymap.value.config.features || {}
    keymap.value.config.features.extrakey = val;
  }
})

const mousekey = computed({
  get() {
    return keymap.value.config?.features?.mousekey ?? false;
  },
  set(val) {
    keymap.value.config = keymap.value.config || {}
    keymap.value.config.features = keymap.value.config.features || {}
    keymap.value.config.features.mousekey = val;
  }
})

const via = computed({
  get() {
    return keymap.value.config?.features?.via ?? false;
  },
  set(val) {
    if (val) {
      keymap.value.config = keymap.value.config || {}
      keymap.value.config.features = keymap.value.config.features || {}
      keymap.value.config.features.via = val;
    } else {
      // TODO: delete actual value and clean up empty parents
      delete keymap.value?.config?.features?.via
    }
  }
})

</script>
