<template>
    <v-btn block color="primary" append-icon="fa-solid fa-play" @click="dialog = true">Compile</v-btn>
    <v-dialog
      v-model="dialog"
      width="auto"
      persistent
      @afterEnter="submitJob"
    >
      <v-card
        max-width="400"
        title="Compiling..."
      >
        <template v-slot:text>
            <p class="text-md-center">Your firmware will be automatically downloaded after the compilation is complete.</p>
            <div class="d-flex justify-center">
                <v-progress-circular :size="64" :width="6" class="ma-6" indeterminate></v-progress-circular>
            </div>
            <!-- <p v-if=jobID class="text-md-center">JobID: {{ jobID }}</p> -->
        </template>
        <template v-slot:actions>
          <v-btn
            class="ms-auto"
            text="Abort"
            @click="abort"
          ></v-btn>
        </template>
      </v-card>
    </v-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useFetch, useIntervalFn } from '@vueuse/core'
import { useKeymapState } from '@/composables/useKeymapState'
// import { saveAs } from 'file-saver';

const { keymap } = useKeymapState()

const dialog = ref(false);
const jobID = ref('')

const { pause, resume } = useIntervalFn(async () => {
    const { data } = await useFetch(`https://api.qmk.fm/v1/compile/${jobID.value}`).get().json()

    if(data.value.status === 'finished') {
        abort();

        // TODO: betterer firmware download
        // saveAs(`https://api.qmk.fm/v1/compile/${jobID.value}/download`, data.value.result.firmware_filename);
        window.open(`https://api.qmk.fm/v1/compile/${jobID.value}/download`, '_blank')
    }
}, 2500, {immediate: false})

const submitJob = async () => {
    const { data } = await useFetch('https://api.qmk.fm/v1/compile').post(keymap.value).json()

    if (!data.value.enqueued) {
        console.log("error?")
        return;
    }

    jobID.value = data.value.job_id;
    resume();
}

const abort = () => {
    pause();
    dialog.value = false;
}

</script>
