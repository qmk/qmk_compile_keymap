import { computed, Ref } from "vue";

export const dottyComputed = (ref: Ref, path: string, def: unknown = false) => {
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

      if ((val || (val === 0)) && val !== def) {
        let cur = ref.value;
        for (const part of parts) {
          cur[part] = cur[part] || {};
          cur = cur[part];
        }
        cur[key] = val;
      } else {
        try {
          const parents = [ref.value];
          for (const part of parts) {
            parents.push(parents[parents.length - 1][part]);
          }

          delete parents[parents.length - 1][key];

          // clean up empty parents
          for (let i = parts.length -1; i >= 0; i--) {
            if(Object.keys(parents[i][parts[i]]).length === 0) {
              delete parents[i][parts[i]];
            }
          }
        } catch {
          // log?
        }
      }
    },
  });
};
