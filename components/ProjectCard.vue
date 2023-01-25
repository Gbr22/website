<script setup lang="ts">
import { Project } from '~~/data';
import { localize } from '~~/localization';

let props = defineProps<{
    project: Project
}>()

</script>

<template>
    <div class="wrap">
        <div class="card">
            <div class="icon">
                <img
                    :src="project.icon.src"
                />
            </div>
            <div class="info">
                <NuxtLink class="title" :to="'/project/'+project.id+'/'">
                    {{ localize(project.title) }}
                </NuxtLink>
                <div class="description">
                    {{ localize(project.description) }}
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.wrap {
    --scale: clamp(18px,1.5vw, 23px);
    background-color: rgba(51, 51, 61, 0.65);
    border-radius: calc(var(--scale) / 2);
    height: 100%;

    .card {
        display: flex;
        flex-direction: row;
        gap: 12px;
        padding: var(--scale);
        

        .icon {
            img {
                width: calc(var(--scale) * 3);
                overflow: hidden;
                background-color: #383841;
                border-radius: calc(var(--scale) / 1.5);
            }
        }
        .info {
            display: flex;
            flex-direction: column;
            justify-content: center;

            .title {
                display: inline-block;
                margin-bottom: calc(var(--scale) / 8);
                text-decoration: none;
                color: white;
                font-weight: bold;
                font-size: calc(var(--scale));

                &:hover {
                    color: #09caaa;
                }
            }

            .description {
                font-size: calc(var(--scale) * 0.80);
                opacity: 0.8;
            }
        }
    }
}
</style>