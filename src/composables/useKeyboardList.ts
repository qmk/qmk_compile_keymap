import { useFetch, UseFetchReturn, createGlobalState } from '@vueuse/core';
import { API_BASE_URL } from '@/constants'

export const useKeyboardList = createGlobalState((): UseFetchReturn<string[]> & PromiseLike<UseFetchReturn<string[]>> => {
  return useFetch(`${API_BASE_URL}/keyboard_list.json`, {
    afterFetch(ctx) {
      ctx.data = ctx.data.keyboards;
      return ctx;
    },
  }).get().json();
});
