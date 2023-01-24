<script setup lang="ts">
import { localize } from '~~/localization';
let route = useRoute();
let id = route.params.id as string;
let {data: project, error} = await useProject(id);
</script>

<template>
    <template v-if="project">
        <div>{{ localize(project.title) }}</div>
        <img :src="project.icon.src" height="50">
    </template>
    <template v-if="error">
        <div>Hiba történt</div>
    </template>
</template>

<style scoped lang="scss">

</style>