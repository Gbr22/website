<script setup lang="ts">
import { localize } from '~~/localization';
import { useProjects } from '~~/api';

let {data: projects, error} = await useProjects();

</script>

<template>
    <h1>projects</h1>

    <div v-if="projects" v-for="project in projects">
        <NuxtLink :to="'/project/'+project.id+'/'">
            {{ localize(project.title) }}
        </NuxtLink>
    </div>
</template>

<style scoped lang="scss">

</style>