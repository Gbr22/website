<script setup lang="ts">
let scrollTop = ref(0);
let scrollListener = (e: Event)=>{
    scrollTop.value = document.documentElement.scrollTop;
}
onMounted(()=>{
    document.addEventListener("scroll",scrollListener);
})
onUnmounted(()=>{
    document.removeEventListener("scroll",scrollListener);
})
</script>

<template>
    <div
        class="container"
        :style="{ '--scroll-top': scrollTop }"
    >
        <NuxtIcon class="icon" name="chevron-down" :filled="true"></NuxtIcon>
        <NuxtIcon class="icon" name="chevron-down" :filled="true"></NuxtIcon>
    </div>
</template>

<style scoped lang="scss">
.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    height: 60px;
    opacity: calc(1 - var(--scroll-top) / 120);

    .icon {
        font-size: 30px;
        position: absolute;

        animation-name: float-down;
        animation-timing-function: ease-in-out;
        animation-iteration-count: infinite;
        animation-duration: 2s;
    }
    .icon:nth-child(2){
        animation-delay: 1s; // fallback
        animation-delay: -1s;
    }
}

@keyframes float-down {
    0% {
        transform: translateY(-25%);
        opacity: 0;
        scale: 0.95;
    }
    20% {
        opacity: 1;
        scale: 1;
    }
    80% {
        opacity: 1;
        scale: 1;
    }
    100% {
        scale: 0.95;
        opacity: 0;
        transform: translateY(25%);
    }
}
</style>