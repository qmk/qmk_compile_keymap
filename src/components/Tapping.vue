<template>
  <v-label>Keycode Delay</v-label>
  <v-number-input :min="0" density="compact" v-model="tap_keycode_delay"/>

  <v-label>Caps Lock Delay</v-label>
  <v-number-input :min="0" density="compact" v-model="tap_capslock_delay"/>

  <v-label>Term</v-label>
  <v-number-input :min="0" density="compact" v-model="term"/>

  <v-label>Toggle</v-label>
  <v-number-input :min="0" density="compact" v-model="toggle"/>
</template>

<script lang="ts" setup>
import { useKeymapState } from '@/composables/useKeymapState'
import { dottyComputed } from '@/dottyComputed';

const { keymap } = useKeymapState();

const tap_keycode_delay = dottyComputed(keymap, 'config.qmk.tap_keycode_delay', 0);
const tap_capslock_delay = dottyComputed(keymap, 'config.qmk.tap_capslock_delay', 80);
const term = dottyComputed(keymap, 'config.tapping.term', 200);
const toggle = dottyComputed(keymap, 'config.tapping.toggle', 5);
</script>
