<script setup lang="ts">
import { ref } from "vue";
import AppLogo from "@/Components/AppLogo.vue";
import { Link } from "@inertiajs/vue3";
</script>

<template>
    <q-layout view="hHh lpR lfr">
        <q-header bordered class="bg-transparent text-dark">
            <q-toolbar>
                <q-toolbar-title >
                    <Link href="/" class="row items-center">
                        <AppLogo />
                    </Link>
                </q-toolbar-title>
            </q-toolbar>
        </q-header>

        <q-page-container class="full-height">
            <slot></slot>
        </q-page-container>

        <q-footer bordered class="bg-transparent text-dark">
            <q-toolbar>
                <q-space />
                <small>Throwy 2023 &copy; Todos os direitos reservados</small>
                <q-space />
            </q-toolbar>
        </q-footer>
    </q-layout>
</template>
