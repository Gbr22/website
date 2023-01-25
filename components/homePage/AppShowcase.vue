<script setup lang="ts">
import { localize } from '~~/localization';
import AppShowcaseItem from './AppShowcaseItem.vue';
let { data: showCase, error } = await useShowcasedApps();

let downloadCount = computed(()=>{
    if(!showCase.value){
        return NaN;
    }
    return showCase.value.reduce((accumulator,e)=>accumulator+e.downloadCount, 0)
})
</script>

<template>
    <div class="showcase">
        <div class="left">
            <h2 class="header">
                {{ localize({
                    en:"In my free time I like to make apps",
                    hu:"Szabadidőmben szeretek appokat fejleszteni"
                }) }}
            </h2>
            <div class="downloads">
                <p class="number">
                    {{ downloadCount }}
                </p>
                <p class="text">
                {{ localize({
                    en:"downloads",
                    hu:"letöltés"
                }) }}
                </p>
            </div>
        </div>
        <div class="right">
            <div class="wrap">
                <div class="list">
                    <div v-for="app in showCase">
                        <AppShowcaseItem :app="app"></AppShowcaseItem>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '~~/styles/homepage.scss';

.showcase {
    margin-top: 30px;
    padding: 10vh var(--page-padding);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: var(--section-spacing);

    .left {
        display: flex;
        flex-direction: column;
        gap: 20px;

        .header {
            @include homepage-header;
        }

        .downloads {
            color: #3C66E9;
            .number {
                font-size: min(10vw,55px);
                font-weight: bold;
            }
            .text {
                font-size: clamp(15px,5vw,20px);
                font-weight: bold;
            }
        }
    }

    .right {
        display: flex;
        justify-content: flex-end;
        flex: 1;

        .wrap {
            min-width: 100%;
            
            .list {
                display: flex;
                flex-direction: row;
                justify-content: center;
                gap: 25px;
            }
        }
    }
}

@media screen and (max-width: 1000px) {
    .showcase {
        padding-bottom: 0;
        padding-top: var(--page-padding);
        flex-direction: column;
        margin-top: 0;
        .left {
            flex-direction: row;
    
            .downloads, .header {
                flex: 1;
            }
            .downloads {
                text-align: right;
            }
        }
        .right {
            width: 100%;
            justify-content: flex-start;
            overflow-x: auto;
            overflow-y: hidden;

            .wrap {
                .list {
                    min-width: 100%;
                    width: auto;
                    overflow: visible;
                    width: max-content;
                }
            }
        }
    }
}
@media screen and (max-width: 800px) {
    .showcase {
        padding: 0;
        padding-top: var(--page-padding);
        margin-top: 30px;

        .left {
            padding: 0 var(--page-padding);
        }
        .right {
            padding: 20px var(--page-padding);
            
            .wrap {
                .list {
                    padding-right: var(--page-padding);
                }
            }
        }
    }
}
</style>