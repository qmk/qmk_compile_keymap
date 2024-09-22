<template>
    <v-switch :hide-details="true" label="Split USB Detect" v-model="usbdetect"/>
    <v-switch :hide-details="true" label="Split Watchdog" v-model="watchdog"/>
    <v-select clearable label="Converter" :items="converters"  v-model="converter"></v-select>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useKeymapState } from '@/composables/useKeymapState'

const { keymap } = useKeymapState()

const converters = [
    'rp2040_ce', // Probably most common so show first

    'bit_c_pro',
    'blok',
    'bonsai_c3',
    'bonsai_c4',
    'elite_pi',
    'helios',
    'imera',
    'kb2040',
    'liatris',
    'michi',
    'proton_c',
    'sparkfun_pm2040',
    'stemcell',
]

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

const converter = computed({
  get() {
    return keymap.value.converter ?? null;
  },
  set(val) {
    if (val) {
        keymap.value.converter = val;
    } else {
        delete keymap.value.converter
    }
  }
})

</script>

