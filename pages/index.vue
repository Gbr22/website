<script setup lang="ts">
import { localize } from '~~/localization';

let { data: showCase, error } = await useShowcasedApps();

let downloadCount = computed(()=>{
    if(!showCase.value){
        return NaN;
    }
    return showCase.value.reduce((accumulator,e)=>accumulator+e.downloadCount, 0)
})
</script>

<template>
    <div>{{ localize({hu:"Kriskó Gábor",en:"Gábor Kriskó"}) }}</div>
    <div>
        <NuxtLink to="projects">projects</NuxtLink>
    </div>
    <h2>Showcase</h2>
    <template v-if="showCase">
        <p>{{ downloadCount }}</p>
        <div v-for="app in showCase">
            <NuxtLink :to="'/project/'+app.id">{{ localize(app.title) }}</NuxtLink>
            <img :src="app.image" height="200" />
        </div>
    </template>
</template>

<style scoped lang="scss">

</style>