<script setup lang="ts">
import { ShowcasedApp } from '~~/data';
import { localize } from '~~/localization';
let props = defineProps<{
    app: ShowcasedApp
}>();
let app = props.app;
</script>

<template>
    <div class="app">
        <img
            class="icon"
            :src="app.icon.src"
            :alt="localize(app.title)+' '+localize({hu:'ikon',en:'icon'})"
        />
        <NuxtLink
            :to="'/project/'+app.id"
            class="link"
        >
            <img
                class="image"
                :src="app.image"
                :alt="localize({hu:'Képernyőkép',en:'Screenshot'})+': '+localize(app.title)"
            />
        </NuxtLink>
    </div>
</template>

<style scoped lang="scss">
.app {
    display: flex;
    flex-direction: column;
    align-items: center;

    .icon {
        --size: clamp(35px,3vw,55px);
        width: var(--size);
        height: var(--size);
        border-radius: calc(var(--size) / 4);
        margin-bottom: 20px;
    }
    .link {
        display: block;
        --height: min(30vw, 500px);
        height: var(--height);
        user-select: none;
        min-width: calc(var(--height) / 4);

        .image {
            height: 100%;
            border-radius: calc(var(--height) / 60);

            box-shadow: 0px 0px 0px 0px transparent;
            transition: box-shadow 0.2s ease, transform 0.25s ease;

            &:hover {
                box-shadow: 0px 0px 0px 3px #3C66E9;
                transform: scale(1.05);
            }
        }
    }
}
@media screen and (max-width: 1000px) {
    .app {
        .link {
            --height: min(40vw, 1500px);
        }
    }
}
@media screen and (max-width: 800px) {
    .app {
        .icon {
            --size: max(min(8vw,8vh),40px)
        }
        .link {
            --height: min(90vw, 70vh);

            .image:hover {
                transform: scale(1.03);
            }
        }
    }
}
</style>