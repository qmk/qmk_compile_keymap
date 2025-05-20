import { useFetch, createGlobalState } from '@vueuse/core';

export const useKeyboardList = createGlobalState(async () => {
  return await useFetch('https://keyboards.qmk.fm/v1/keyboard_list.json', {
    afterFetch(ctx) {
      ctx.data = ctx.data.keyboards;
      return ctx;
    },
  }).get().json();
});
