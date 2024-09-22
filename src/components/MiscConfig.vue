<template>
    <v-switch hide-details label="Split USB Detect" v-model="usbdetect"/>
    <v-switch hide-details label="Split Watchdog" v-model="watchdog"/>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useKeymapState } from '@/composables/useKeymapState'

const { keymap } = useKeymapState()

const usbdetect = computed({
  get() {
    return keymap.value.config?.split?.usb_detect?.enabled ?? false;
  },
  set(val) {
    if (val) {
        keymap.value.config = keymap.value.config || {}
        keymap.value.config.split = keymap.value.config.split || {}
        keymap.value.config.split.usb_detect = keymap.value.config.split.usb_detect || {}
        keymap.value.config.split.usb_detect.enabled = true;
    } else {
        // TODO: delete actual value and clean up empty parents
        delete keymap.value?.config?.split?.usb_detect
    }
  }
})

const watchdog = computed({
  get() {
    return keymap.value.config?.split?.transport?.watchdog ?? false;
  },
  set(val) {
    if (val) {
        keymap.value.config = keymap.value.config || {}
        keymap.value.config.split = keymap.value.config.split || {}
        keymap.value.config.split.transport = keymap.value.config.split.transport || {}
        keymap.value.config.split.transport.watchdog = true;
    } else {
        // TODO: delete actual value and clean up empty parents
        delete keymap.value?.config?.split?.transport
    }
  }
})

</script>

