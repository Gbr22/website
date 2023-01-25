<script setup lang="ts">
let props = defineProps<{
    text: string
    href: string
    icon: string
}>();
</script>

<template>
    <div class="item">
        <a :href="props.href" target="_blank">
            <div class="icon">
                <nuxt-icon :name="props.icon"></nuxt-icon>
            </div>
            <span class="text">{{ props.text }}</span>
        </a>
    </div>
</template>

<style scoped lang="scss">
.item {
    a {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 18px;
        padding: 10px 18px;
        border-radius: 15px;
        transition: background-color 0.2s ease;

        &:hover {
            background-color: rgba(51, 51, 61, 0.65);
        }

        .icon {
            --size: clamp(22px, 8vw, 40px);
            font-size: var(--size);
            width: var(--size);
            height: var(--size);
            display: flex;
            justify-content: center;
            align-items: center;
            color: #0edcb9;
        }
        .text {
            font-size: clamp(16px, 4vw,20px);
            color: white;
        }
    }
}
</style>