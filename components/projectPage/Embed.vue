<script setup lang="ts">
import { injectCurrentProject } from '../../composables/useData';
let project = injectCurrentProject();

let hasLoaded = ref(false);
</script>

<template>
    <div class="section">
        <div
            class="container"
            v-if="project.embed"
            :class="{ loaded: hasLoaded }"
            :style="{ '--min-height': project.embed.minHeight }"
        >
            <div class="loading-animation"></div>
            <iframe
                :src="project.embed.src"
                allow="gyroscope *; accelerometer *; magnetometer *; fullscreen *;"
                v-on:load="hasLoaded = true"
            ></iframe>
        </div>
    </div>
</template>

<style scoped lang="scss">
.section {
    padding: 0 var(--page-padding);

    .container {
        width: 100%;
        aspect-ratio: 16/9;
        position: relative;
        margin-top: var(--section-spacing);
        border-radius: 12px;
        overflow: hidden;
        min-height: calc(var(--min-height) * 1vh);
        max-height: 80vh;

        .loading-animation, iframe {
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            position: absolute;
        }

        .loading-animation {
            background-color: #33323c;
            --color1: #33323c;
            --color2: #555567;
            background-image: linear-gradient(90deg, var(--color1), var(--color2), var(--color1));
            background-size: 200% 100%;
            animation-name: loading-gradient;
            animation-duration: 2.5s;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
        }

        iframe {
            border: none;
            width: 100%;
            height: 100%;
            opacity: 0;
            z-index: 1;
        }

        &.loaded {
            iframe {
                opacity: 1;
                transition: opacity 0.3s ease-out;
            }
        }
    }
}

@keyframes loading-gradient {
    0% {
        background-position-x: 0;
    }
    100% {
        background-position-x: -200%;
    }
}
</style>