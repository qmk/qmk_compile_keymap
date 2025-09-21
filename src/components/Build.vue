<template>
  <v-switch v-model="lto" hide-details label="LTO" />

  <v-label>Converter</v-label>
  <v-select v-model="converter" clearable :items="CONVERTERS" density="compact" />
</template>
  
<script lang="ts" setup>
import { useKeymapState } from '@/composables/useKeymapState';
import { dottyComputed } from '@/dottyComputed';

const CONVERTERS = [
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
];

const { keymap } = useKeymapState();

const lto = dottyComputed(keymap, 'config.build.lto');
const converter = dottyComputed(keymap, 'converter', null);
</script>
