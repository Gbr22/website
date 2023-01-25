<script setup lang="ts">
import { localize } from '~~/localization';
import { injectCurrentProject } from '../../composables/useData';
let project = injectCurrentProject();

function formatTagName(str: string){
    if (str[0] == 'v'){
        return str.replace("v",""); // v1.5.6 -> 1.5.6
    }
    return str;
}
function formatDate(dateString: string){
    let date = new Date(dateString);
    let padNumber = (n: number)=>n >= 10 ? n.toString() : "0"+n;
    return `${date.getFullYear()}/${padNumber(date.getMonth()+1)}/${padNumber(date.getDate())}`;
}
</script>

<template>
    <div class="releases" v-if="project.releases">
        <h2 class="header">{{ localize({hu:"Változtatások", en:"Change log"}) }}</h2>
        <div class="list">
            <div class="release" v-for="release in project.releases">
                <div class="header">
                    <h6 class="tag">{{ formatTagName(release.tagName) }}</h6>
                    <span class="date">{{ formatDate(release.publishedAt) }}</span>
                </div>
                <pre class="body" v-if="release.body">{{ localize(release.body) }}</pre>
                <pre class="body empty" v-else>{{ localize({hu: "Nincs megjegyzés", en: "No comment"}) }}</pre>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.releases {
    margin-top: var(--section-spacing);
    padding: 0 var(--page-padding);

    & > .header {
        font-weight: 700;
        font-size: 32px;
        padding: 20px 0;
    }

    .list {
        display: flex;
        flex-direction: column;
        gap: 25px;
        .release {
            .header {
                padding: 8px 0;
                vertical-align: middle;
                .tag {
                    font-size: 19px;
                    font-weight: 700;
                    display: inline-block;
                    margin-right: 8px;
                }
                .date {
                    font-size: 16px;
                    color: white;
                    opacity: 0.66;
                }
            }
            .body {
                white-space: pre-wrap;

                &.empty {
                    opacity: 0.8;
                    font-style: italic;
                }
            }
        }
    }
}
@media screen and (max-width: 800px) {
    .releases {
        & > .header {
            font-size: 25px;
            text-align: center;
        }
    }
}
</style>