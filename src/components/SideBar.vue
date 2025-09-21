<template>
  <v-navigation-drawer permanent>
    <v-list v-model:opened="open" nav>
      <Compile />

      <v-divider />

      <v-list-group value="Features">
        <template #activator="{ props }">
          <v-list-item v-bind="props" title="Features" />
        </template>

        <Features />
      </v-list-group>

      <v-divider />

      <v-list-group value="Config">
        <template #activator="{ props }">
          <v-list-item v-bind="props" title="Config" />
        </template>

        <MiscConfig />
      </v-list-group>

      <v-divider />

      <v-list-group value="Tapping">
        <template #activator="{ props }">
          <v-list-item v-bind="props" title="Tapping" />
        </template>

        <Tapping />
      </v-list-group>

      <v-divider/>

      <v-list-group value="Debounce">
        <template #activator="{ props }">
          <v-list-item v-bind="props" title="Debounce" />
        </template>

        <Debounce />
      </v-list-group>

      <v-divider/>

      <v-list-group value="Build">
        <template #activator="{ props }">
          <v-list-item v-bind="props" title="Build" />
        </template>

        <Build />
      </v-list-group>

      <v-divider />
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const open = ref(['Features']);
</script>
