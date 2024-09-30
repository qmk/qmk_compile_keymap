<template>
  <v-slider :max="50" :min="0" :step="1" class="pb-2" label="Value" v-model="value" hide-details>
    <template #append>
      <v-text-field
        v-model="value"
        density="compact"
        style="width: 5em"
        type="number"
        hide-details
        single-line
      />
    </template>
  </v-slider>
  <v-select clearable label="Algorithms" :items="DEBOUNCE_TYPES" v-model="type"/>
</template>

<script lang="ts" setup>
import { useKeymapState } from '@/composables/useKeymapState'
import { dottyComputed } from '@/dottyComputed';

const { keymap } = useKeymapState()

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
