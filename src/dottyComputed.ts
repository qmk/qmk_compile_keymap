import { computed, Ref } from "vue";

export const dottyComputed = (ref: Ref, path: string, def: any = false) => {
  const parts = path.split(".");
  const key: string = parts.pop() as string;

  return computed({
    get() {
      try {
        let cur = ref.value;
        for (const part of parts) {
          cur = cur[part];
        }
        return cur[key] ?? def;
      } catch {
        return def;
      }
    },
    set(val) {
      if (typeof def === "number") {
        val = +val;
      }

      if (val && val !== def) {
        let cur = ref.value;
        for (const part of parts) {
          cur[part] = cur[part] || {};
          cur = cur[part];
        }
        cur[key] = val;
      } else {
        try {
          let cur = ref.value;
          for (const part of parts) {
            cur = cur[part];
          }
          // TODO: clean up empty parents
          delete cur[key];
        } catch {
          // log?
        }
      }
    },
  });
};
