import { ref } from 'vue'
import { createGlobalState } from '@vueuse/core'

import type {KeyboardInformation} from 'keyboard.d.ts'

import defaultKeymap from '@/assets/keymap.json'

export type Keymap = {
    version: number,

    keyboard: string, 
    keymap: string, 
    layout: string,

    layers:string[][],

    config?: KeyboardInformation,

    converter?: string,

    author?: string,
    notes?: string,
    documentation?: string,
}

export const useKeymapState = createGlobalState(
  () => {
    const keymap = ref<Keymap>(JSON.parse(JSON.stringify(defaultKeymap)))
    return { keymap }
  }
)