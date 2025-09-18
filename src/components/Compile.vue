<template>
  <v-btn block color="primary" class="mt-2 mb-4" append-icon="fa-solid fa-play" @click="dialog = true">Compile</v-btn>
  <v-dialog
    v-model="dialog"
    width="auto"
    persistent
    @after-enter="submitJob"
  >
  <v-card
      max-width="400"
      title="Compiling..."
    >
      <template #text>
        <p class="text-md-center">Your firmware will be automatically downloaded after the compilation is complete.</p>
        <div class="d-flex justify-center">
          <v-progress-circular :size="64" :width="6" class="ma-6" indeterminate/>
        </div>
      </template>

      <template #actions>
        <v-btn class="ms-auto" text="Abort" @click="abort"/>
        <a class="d-none" ref="downloadBtn" :download="firmwareName" :href="firmwareURL"/>
      </template>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useFetch, useIntervalFn } from '@vueuse/core'
import { useKeymapState } from '@/composables/useKeymapState'
import { COMPILE_BASE_URL } from '@/constants'

const { keymap } = useKeymapState();

const dialog = ref(false);
const downloadBtn = ref();

const jobID = ref('');
const firmwareName = ref('');

const firmwareURL = computed(() => {
    return `${COMPILE_BASE_URL}/${jobID.value}/download`;
})

const { pause, resume } = useIntervalFn(async () => {
    const { data } = await useFetch(`https://api.qmk.fm/v1/compile/${jobID.value}`).get().json();

    if(data.value.status === 'finished' && !data.value.is_failed) {
      firmwareName.value = data.value.result.firmware_filename;

      setTimeout(() => {
        download();
      });
    } else if(data.value.status === 'finished' && data.value.is_failed) {
      console.log(data.value.result.output);

      abort();
    }
}, 2500, {immediate: false})

const submitJob = async () => {
    const { data } = await useFetch('https://api.qmk.fm/v1/compile').post(keymap.value).json();

    if (!data.value.enqueued) {
        console.log("error?");
        return;
    }

    jobID.value = data.value.job_id;
    resume();
}

const abort = () => {
    pause();
    dialog.value = false;
}

const download = () => {
    abort();

    downloadBtn.value?.click();
}

</script>
