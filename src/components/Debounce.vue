<template>
  <v-label>Value</v-label>
  <v-number-input v-model="value" :max="50" :min="0" density="compact" />

  <v-label>Algorithm</v-label>
  <v-select v-model="type" clearable :items="DEBOUNCE_TYPES" />
</template>

<script lang="ts" setup>
import { useKeymapState } from '@/composables/useKeymapState';
import { dottyComputed } from '@/dottyComputed';

const { keymap } = useKeymapState();

const DEBOUNCE_TYPES = [
  "asym_eager_defer_pk",
  "sym_defer_g",
  "sym_defer_pk",
  "sym_defer_pr",
  "sym_eager_pk",
  "sym_eager_pr",
];

const value = dottyComputed(keymap, 'config.debounce', 5);
const type = dottyComputed(keymap, 'config.build.debounce_type', null);
</script>
