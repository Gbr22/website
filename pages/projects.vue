<script setup lang="ts">
import { localize } from '~~/localization';
let {data: projects, error} = await useProjects();

useHead({
    title: localize({hu:"Projektek",en:"Projects"}),
    link: [{
        rel: "icon",
        href: "/favicon.svg",
        type: "image/svg+xml"
    }]
})
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