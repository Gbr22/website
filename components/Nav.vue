<script setup lang="ts">
import { localize } from '~~/localization';

let props = defineProps<{
    isHomepage?: boolean,
}>()

let links = [
    {
        title:{
            en:"Home",
            hu:"Kezdőlap"
        },
        url:"/",
    },
    {
        title:{
            en:"Projects",
            hu:"Projektek"
        },
        url:"/projects",
    },
    {
        title:{
            en:"Contact",
            hu:"Kapcsolat"
        },
        url:"/#contact",
    }
];
</script>

<template>
    <nav
        :class="{isHomepage: props.isHomepage}"
    >
        <div class="inner">
            <NuxtLink v-for="link in links" :key="link.url" class="link" :to="link.url">
                <div class="text">{{ localize(link.title) }}</div>
            </NuxtLink>
        </div>
    </nav>
</template>

<style scoped lang="scss">
@import '~~/styles/homepage.scss';

nav.isHomepage {
    margin-top: -128px;
}
nav {
    position: sticky;
    top: 0;
    z-index: 900;
    width: 100%;
    display: grid;
    place-content: center;

    .inner {
        background-color: rgba(51, 51, 61, 0.9);
        border-radius: 20px;
        padding: 0 20px;
        margin-top: 10px;

        @supports (backdrop-filter: blur(15px)){
            background-color: rgba(51, 51, 61, 0.65);
            backdrop-filter: blur(15px);
        }

        .link {
            display: inline-block;
            position: relative;
            transition: background-color 0.25s ease;

            ::before, ::after {
                content: '';
                width: 0;
                background-color: rgba(197, 206, 252, 0.5);
                position: absolute;
                height: 2px;
                opacity: 0;
                transition: width 0.35s ease, opacity 0.25s ease;
            }
            ::before {
                top: 0;
                left: 0;
            }
            ::after {
                bottom: 0;
                right: 0;
            }

            .text {
                padding: 16px 12px;
                font-size: clamp(15px,2vw,19px);
            }

            &:hover {
                background-color: rgba(255,255,255,0.1);
                ::before, ::after {
                    opacity: 1;
                    transform: translateY(0);
                    width: 100%;
                }
            }
        }
    }
}
</style>