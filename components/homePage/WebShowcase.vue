<script setup lang="ts">
import { localize } from '~~/localization';
import WebShowcaseItem from './WebShowcaseItem.vue';

</script>

<template>
    <div class="showcase">
        <div class="caption">
            <h2 class="header">
                {{ localize({
                    en:"But I also design websites",
                    hu:"De weblapokat is tervezek"
                }) }}
            </h2>
            <div class="icon">
                <nuxt-icon name="compass"></nuxt-icon>
            </div>
        </div>
        <div class="items">
            <WebShowcaseItem url="https://hazmelege.hu"></WebShowcaseItem>
            <WebShowcaseItem url="https://dimelang.tk"></WebShowcaseItem>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '~~/styles/homepage.scss';

.showcase {
    overflow: visible;
    display: flex;
    flex-direction: row;
    position: relative;
    justify-content: space-between;
    padding: 0 var(--page-padding);
    margin-top:var(--section-spacing);

    .caption {
        box-sizing: content-box;
        padding: var(--section-spacing) 0;
        --height: 10vh;
        height: var(--height);
        position: sticky;
        align-self: flex-end;
        display: flex;
        bottom: calc(50% - var(--height) / 2 - var(--section-spacing));
        justify-content: center;
        align-items: center;

        .header {
            @include homepage-header;
            width: 25vw;
        }
        .icon {
            font-size: 50px;
            color: #3C66E9;
            display: none;
        }
    }
    .items {
        position: relative;
        width: 50vw;
        display: flex;
        flex-direction: column;
        gap: var(--section-spacing);
    }
}
@media screen and (max-width: 1000px) {
    .showcase {
        gap: var(--section-spacing);
        flex-direction: column;

        .caption {
            box-sizing: border-box;
            position: relative;
            height: unset;
            padding: 0;
            display: flex;
            flex-direction: row;
            width: 100%;
            justify-content: space-between;

            .header {
                padding: var(--section-spacing) 0;
                width: unset;
                max-width: min(60%,300px)
            }
            .icon {
                display: block;
            }
        }
        .items {
            flex-direction: row;
            width: 100%;
        }
    }
}
@media screen and (max-width: 800px) {
    .showcase {
        padding: 0;
        .caption {
            padding: 0 var(--page-padding);
            .icon {
                font-size: max(40px,10vw);
            }
        }
        .items {
            padding: 20px var(--page-padding);
            overflow-x: scroll;
            overflow-y: hidden;
            justify-content: flex-start;
            align-items: flex-start;
        }
    }
}
@media screen and (max-width: 650px) {
    .showcase {
        .items {
            flex-direction: column;
        }
    }
}
</style>