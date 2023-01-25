<script setup lang="ts">
let props = defineProps<{
    url: string
}>()
</script>

<template>
    <div class="container">
        <div class="urlbar">
            <nuxt-icon class="lock" name="lock"></nuxt-icon>
            <a class="url" :href="url" target="_blank">
                <span class="protocol">https://</span>{{url.replace('https://','')}}
            </a>
        </div>
        <div class="wrap">
            <iframe :src="url"></iframe>
            <div class="overlay"></div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.container {
    border-radius: max(12px, calc(80vw / 100));
    overflow: hidden;
    display: flex;
    flex-direction: column;
    background-color: #2c2c2c;
    border: 2px solid #2c2c2c;
    width: 50vw;

    .urlbar {
        background-color: #2c2c2c;
        padding: 10px;
        display: flex;
        gap: 10px;
        align-items: center;

        .lock {
            color: #72eac2;
            font-size: 15px;
        }
        .url {
            color: white;
            text-decoration: none;
            .protocol {
                color: #aaaaaa;
            }
        }
    }

    .wrap {
        position: relative;
        display: flex;

        iframe {
            border: none;
            height: 70vh;
            width: 100%;
            min-height: 500px;
            position: relative;
            pointer-events: none;
        }
        .overlay {
            background-color: transparent;
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            pointer-events: all;
        }
    }
}
@media screen and (max-width: 1000px) {
    .container {
        flex: 1;

        .wrap {
            iframe {
                height: 70vh;
            }
        }
    }
}
@media screen and (max-width: 800px) {
    .container {
        flex: unset;
        min-width: 56vw;
    }
}
@media screen and (max-width: 650px) {
    .container {
        min-width: unset;
        width: 100%;
    }
}
</style>