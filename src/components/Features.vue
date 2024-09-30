<template>
  <v-switch hide-details label="Bootmagic" v-model="bootmagic"/>
  <v-switch hide-details label="Extra Keys" v-model="extrakey"/>
  <v-switch hide-details label="Mouse Keys" v-model="mousekey"/>
  <v-switch hide-details label="VIA" v-model="via"/>
</template>

<script lang="ts" setup>
import { useKeymapState } from '@/composables/useKeymapState'
import { dottyComputed } from '@/dottyComputed';

const { keymap } = useKeymapState()

const bootmagic = dottyComputed(keymap, 'config.features.bootmagic');
const extrakey = dottyComputed(keymap, 'config.features.extrakey');
const mousekey = dottyComputed(keymap, 'config.features.mousekey');
const via = dottyComputed(keymap, 'config.features.via');

</script>
