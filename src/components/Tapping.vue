<template>
  <v-label>Keycode Delay</v-label>
  <v-number-input v-model="tap_keycode_delay" :min="0" density="compact" />

  <v-label>Caps Lock Delay</v-label>
  <v-number-input v-model="tap_capslock_delay" :min="0" density="compact" />

  <v-label>Term</v-label>
  <v-number-input v-model="term" :min="0" density="compact" />

  <v-label>Toggle</v-label>
  <v-number-input v-model="toggle" :min="0" density="compact" />
</template>

<script lang="ts" setup>
import { useKeymapState } from '@/composables/useKeymapState';
import { dottyComputed } from '@/dottyComputed';

const { keymap } = useKeymapState();

const tap_keycode_delay = dottyComputed(keymap, 'config.qmk.tap_keycode_delay', 0);
const tap_capslock_delay = dottyComputed(keymap, 'config.qmk.tap_capslock_delay', 80);
const term = dottyComputed(keymap, 'config.tapping.term', 200);
const toggle = dottyComputed(keymap, 'config.tapping.toggle', 5);
</script>
