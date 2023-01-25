<script setup lang="ts">
import { localize } from '../localization';
import { useProjects } from '../composables/useData';
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
    <Nav></Nav>
    <h1>{{ localize({hu:"Projektek",en:"Projects"}) }}</h1>
    <div class="projects" v-if="projects">
        <div v-for="project in projects">
            <ProjectCard :project="project"></ProjectCard>
        </div>
    </div>
</template>

<style scoped lang="scss">
h1 {
    font-size: clamp(30px,3vw,45px);
    font-weight: bold;
    text-align: center;
    padding: calc(5vw + 5vh);
}
.projects {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    padding: 0 var(--page-padding);
    gap: calc(var(--section-spacing) / 3);
}
.projects {
    padding-bottom: var(--section-spacing);
}
@media screen and (max-width: 950px) {
    .projects {
        grid-template-columns: repeat(2, 1fr);
    }
}
@media screen and (max-width: 630px) {
    .projects {
        grid-template-columns: repeat(1, 1fr);
    }
}
</style>