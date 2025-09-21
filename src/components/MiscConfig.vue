<template>
    <v-switch v-model="usbdetect" hide-details label="Split USB Detect" />
    <v-switch v-model="watchdog" hide-details label="Split Watchdog" />
</template>

<script lang="ts" setup>
import { useKeymapState } from '@/composables/useKeymapState';
import { dottyComputed } from '@/dottyComputed';

const { keymap } = useKeymapState();

const usbdetect = dottyComputed(keymap, 'config.split.usb_detect.enabled');
const watchdog = dottyComputed(keymap, 'config.split.transport.watchdog');
</script>
