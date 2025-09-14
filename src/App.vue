<template>
  <v-app>
    <v-app-bar :elevation="2">
      <template #prepend>
        <v-fab-transition>
          <v-img :src="`qmk-logo-${mode}.svg`" height="32px" width="48px" position="right"/>
        </v-fab-transition>
      </template>

      <v-app-bar-title>QMK Keymap Compiler</v-app-bar-title>

      <template #append>
        <v-switch class="d-none d-sm-flex" inset true-icon="fa-regular fa-moon" false-icon="fa-regular fa-sun"
          true-value="dark" false-value="light" theme="light" v-model="mode" />
        <v-divider class="mx-2 my-4 d-none d-md-flex" vertical />
        <v-btn class="d-none d-md-flex" size="small" href="https://discord.gg/qmk" icon="fa-brands fa-discord" />
        <v-btn class="d-none d-md-flex" size="small" href="https://github.com/qmk/qmk_compile_keymap" icon="fa-brands fa-github" />
      </template>
    </v-app-bar>

    <v-main>
      <SideBar/>
      <suspense>
        <Actions/>
      </suspense>
      <Editor/>
    </v-main>

    <v-footer app class="text-center d-flex flex-column" :elevation="2">
      <small>This project is maintained by QMK collaborators and contributors like you!</small>
    </v-footer>
  </v-app>
</template>

<script lang="ts" setup>
import { useColorMode } from "@vueuse/core";
import { useTheme } from "vuetify";

const theme = useTheme();
const mode = useColorMode({
  onChanged: (mode) => {
    theme.change(mode);
  },
});

theme.change(mode.value);
</script>
