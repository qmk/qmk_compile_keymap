<template>
  <v-switch hide-details label="LTO" v-model="lto"/>
  <v-select clearable label="Converter" :items="converters" v-model="converter"/>
</template>
  
<script lang="ts" setup>
  import { computed } from 'vue'
  import { useKeymapState } from '@/composables/useKeymapState'
  
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
        delete keymap.value?.config?.build?.lto;
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
