<script setup lang="ts">
import AppShowcase from '~~/components/homePage/AppShowcase.vue';
import WebShowcase from '~~/components/homePage/WebShowcase.vue';
import Contact from '~~/components/homePage/Contact.vue';
import { localize } from '~~/localization';

useHead({
    title: localize({hu:"Kriskó Gábor",en:"Gábor Kriskó"}),
    link: [{
        rel: "icon",
        href: "/favicon.svg",
        type: "image/svg+xml"
    }]
})
</script>

<template>
    <HomePageHero></HomePageHero>
    <Nav :is-homepage="true"></Nav>
    <AppShowcase></AppShowcase>
    <WebShowcase></WebShowcase>
    <Contact></Contact>
</template>

<style scoped lang="scss">

</style>