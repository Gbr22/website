<script setup lang="ts">
import { localize } from '../../localization';
import Head from '../../components/projectPage/Head.vue';
import Embed from '../../components/projectPage/Embed.vue';
import Gallery from '../../components/projectPage/Gallery.vue';
import GitInfo from '../../components/projectPage/GitInfo.vue';
import Releases from '../../components/projectPage/Releases.vue';
import { useCurrentProject } from '../../composables/useData';
let { data, error } = await useCurrentProject();

if (!data.value){
    throw createError({ statusCode: 404, statusMessage: localize({
        hu: "Projekt nem található",
        en: "Project not found"
    }) });
}

if (error.value){
    throw createError({ statusCode: 500, statusMessage: localize({
        hu: "Ismeretlen hiba történt",
        en: "An unknown error occurred"
    }) });
}

let project = data.value;

provide("project",project);

useHead({
    title: localize(project.title),
    link: [{
        rel: "icon",
        href: project.icon.src,
    }],
    meta: [{
        name: "description",
        content: localize(project.description)
    }]
})

</script>

<template>
    <div class="project">
        <Nav></Nav>
        <Head></Head>
        <Embed></Embed>
        <Gallery></Gallery>
        <Releases></Releases>
        <GitInfo></GitInfo>
    </div>
</template>

<style scoped lang="scss">
.project {
    padding-bottom: var(--page-padding);
}
@media screen and (max-width: 550px) {
    .project {
        --page-padding: 20px;
    }
}
</style>