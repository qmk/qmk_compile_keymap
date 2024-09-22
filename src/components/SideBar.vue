<template>
    <v-navigation-drawer permanent>
        <v-list nav v-model:opened="open">
            <Compile/>
            <v-list-group value="Features">
                <template v-slot:activator="{ props }">
                    <v-list-item v-bind="props" title="Features"/>
                </template>
                <Features/>
            </v-list-group>
            <v-list-group value="Config">
                <template v-slot:activator="{ props }">
                    <v-list-item v-bind="props" title="Config"/>
                </template>
                <MiscConfig/>
            </v-list-group>
            <v-list-group value="Debounce">
                <template v-slot:activator="{ props }">
                    <v-list-item v-bind="props" title="Debounce"/>
                </template>
                <Debounce/>
            </v-list-group>
            <v-list-group value="Build">
                <template v-slot:activator="{ props }">
                    <v-list-item v-bind="props" title="Build"/>
                </template>
                <Build/>
            </v-list-group>
        </v-list>
    </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const open = ref(['Features']);
</script>
