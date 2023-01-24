<script setup lang="ts">
import { localize } from '~~/localization';


</script>

<template>
    <div class="hero">
        <div class="name">
            {{ localize({hu:"Kriskó Gábor",en:"Gábor Kriskó"}) }}
        </div>
    </div>
</template>

<style scoped lang="scss">
.hero {
    height: calc(100vh - 50px); // mobile fallback
    @media (hover: hover) and (pointer: fine){
        height: 100vh; // desktop fallback
    }
    height: 100svh;

    

    display: grid;
    place-content: center;
    padding-bottom: 50px;

    .name {
        font-family: 'Modak';
        font-size: min(23vw,calc(30vh - 20px));
        filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.219));
        text-align: center;
        line-height: 105%;
        width: min-content;

        &::selection {
            color: black;
            background-color: #0eeec971;
        }

        @supports(background-clip: text){
            background: url('/images/bg.jpg');
            background-size: cover;
            background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        @media (min-aspect-ratio: 5/2) {
            width: max-content;
            background-position: 20% 20%;
        }
    }
}
</style>