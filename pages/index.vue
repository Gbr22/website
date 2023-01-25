<script setup lang="ts">
import AppShowcase from '~~/components/homePage/AppShowcase.vue';
import Contact from '~~/components/homePage/Contact.vue'
</script>

<template>
    <HomePageHero></HomePageHero>
    <Nav :is-homepage="true"></Nav>
    <AppShowcase></AppShowcase>
    <Contact></Contact>
</template>

<style scoped lang="scss">

</style>