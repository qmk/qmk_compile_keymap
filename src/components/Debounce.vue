<template>
  <v-slider :max="50" :min="0" :step="1" label="Value" v-model="value" hide-details>
    <template v-slot:append>
      <v-text-field
        v-model="value"
        density="compact"
        style="width: 5em"
        type="number"
        hide-details
        single-line
      ></v-text-field>
    </template>
  </v-slider>
  <v-select clearable label="Algorithms" :items="debounce_type" v-model="type"/>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useKeymapState } from '@/composables/useKeymapState'

const { keymap } = useKeymapState()

const debounce_type = [
  "asym_eager_defer_pk",
  "sym_defer_g",
  "sym_defer_pk",
  "sym_defer_pr",
  "sym_eager_pk",
  "sym_eager_pr",
];

const value = computed({
  get() {
    return keymap.value.config?.debounce ?? 5;
  },
  set(val) {
    val = +val;
    if (val !== 5) {
        keymap.value.config = keymap.value.config || {}
        keymap.value.config.debounce = val;
    } else {
        delete keymap.value.config?.debounce;
    }
  }
})

const type = computed({
    get() {
      return keymap.value.config?.build?.debounce_type ?? null;
    },
    set(val) {
      if (val) {
        keymap.value.config = keymap.value.config || {}
        keymap.value.config.build = keymap.value.config.build || {}
        keymap.value.config.build.debounce_type = val;
      } else {
        // TODO: delete actual value and clean up empty parents
        delete keymap.value?.config?.build?.debounce_type;
      }
    }
  })

</script>
