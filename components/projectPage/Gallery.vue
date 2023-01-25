<script setup lang="ts">
import { injectCurrentProject } from '../../composables/useData';
let project = injectCurrentProject();
</script>

<template>
    <div class="gallery" v-if="project.images">
        <div class="inner">
            <img
                v-for="image in project.images"
                :src="image"
            >
        </div>
    </div>
</template>

<style scoped lang="scss">
.gallery {
    margin-top: var(--section-spacing);
    max-width: 100%;
    padding: 0 var(--page-padding);

    .inner {
        display: flex;
        flex-direction: row;
        overflow-y: hidden;
        overflow-x: auto;
        max-width: 100%;
        gap: 16px;
        padding-bottom: 16px;

        img {
            --height: 58vh;
            height: var(--height);
            border-radius: calc(var(--height) / 40);
        }
    }
}
@media screen and (max-width: 800px) {
    .gallery {
        padding: 0;
        .inner {
            padding-left: var(--page-padding);
            padding-right: var(--page-padding);
        }
    }
}
</style>