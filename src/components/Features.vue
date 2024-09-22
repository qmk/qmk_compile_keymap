<template>
  <v-switch hide-details label="Bootmagic" v-model="bootmagic"/>
  <v-switch hide-details label="Extra Keys" v-model="extrakey"/>
  <v-switch hide-details label="Mouse Keys" v-model="mousekey"/>
  <v-switch hide-details label="VIA" v-model="via"/>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useKeymapState } from '@/composables/useKeymapState'

const { keymap } = useKeymapState()

const bootmagic = computed({
  get() {
    return keymap.value.config?.features?.bootmagic ?? false;
  },
  set(val) {
    keymap.value.config = keymap.value.config || {}
    keymap.value.config.features = keymap.value.config.features || {}
    keymap.value.config.features.bootmagic = val;
  }
})

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
