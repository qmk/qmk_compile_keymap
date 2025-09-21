<template>
  <v-switch v-model="bootmagic" hide-details label="Bootmagic" />
  <v-switch v-model="extrakey" hide-details label="Extra Keys" />
  <v-switch v-model="mousekey" hide-details label="Mouse Keys" />
  <v-switch v-model="nkro" hide-details label="NKRO" />
  <v-switch v-model="via" hide-details label="VIA" />
</template>

<script lang="ts" setup>
import { useKeymapState } from '@/composables/useKeymapState';
import { dottyComputed } from '@/dottyComputed';

const { keymap } = useKeymapState();

const bootmagic = dottyComputed(keymap, 'config.features.bootmagic');
const extrakey = dottyComputed(keymap, 'config.features.extrakey');
const mousekey = dottyComputed(keymap, 'config.features.mousekey');
const nkro = dottyComputed(keymap, 'config.features.nkro');
const via = dottyComputed(keymap, 'config.features.via');
</script>
