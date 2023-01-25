<script setup lang="ts">
import { localize, LocalizedText } from '~~/localization';
import { injectCurrentProject } from '../../composables/useData';
let project = injectCurrentProject();

interface ActionConfig {
    text: LocalizedText
    openNewTab?: boolean
    sortIndex: number
    download?: boolean
}
let actions: {[key: string]: ActionConfig} = {
    "directDownload":{
        text: { hu: "Letöltés", en: "Download" },
        openNewTab: false,
        sortIndex: 2,
        download: true
    },
    "website":{
        text: { hu: "Weboldal", en: "Website" },
        sortIndex: 1
    },
    "open":{
        text: { hu: "Megnyitás", en: "Open" },
        sortIndex: 0
    },
    "googleplay":{
        text: { hu: "Play Áruház", en: "Play Store" },
        sortIndex: 3,
    },
    "default": {
        text: { hu: "Hiba", en: "Hiba" },
        sortIndex: Infinity,
    }
};

let projectActions = Object.entries(project.actions).map(([type,url])=>{
    let config = actions[type] || actions.default;

    return {
        type,
        url,
        isPrimary: false,
        ...config
    }
}).sort((a,b)=>{
    return a.sortIndex - b.sortIndex;
});
projectActions[0].isPrimary = true;
</script>

<template>
    <div class="head">
        <div
            class="icon"
            :class="{ 'no-border': !project.icon.showBorder }"
        >
            <img
                :src="project.icon.src"
            />
        </div>
        <div class="text">
            <h1 class="title">{{ localize(project.title) }}</h1>
            <p class="description">{{ localize(project.longDescription || project.description) }}</p>
        </div>
        <div class="actions">
            <a
                class="action"
                v-for="action in projectActions"
                :class="{ primary: action.isPrimary }"
                :target="action.openNewTab != false ? '_blank' : undefined"
                :href="action.url"
                :download="action.download"
            >
                {{ localize(action.text) }}
            </a>
        </div>
    </div>
</template>

<style scoped lang="scss">
.head {
    padding: 0 var(--page-padding);
    margin-top: var(--section-spacing);
    display: grid;
    grid-template-columns: fit-content(100%) auto fit-content(100%);
    grid-template-areas:
        "icon text actions";
    gap: 10px 20px;
    
    .icon {
        grid-area: icon;
        --size: max(min(18vw,110px),70px);
        height: var(--size);
        width: var(--size);
        overflow: hidden;
        box-shadow: 0 0 0 2px #43414b;
        border-radius: calc(var(--size) / 6);

        &.no-border {
            box-shadow: none;
        }

        img {
            width: 100%;
            height: 100%;
        }
    }
    .text {
        grid-area: text;
        display: flex;
        flex-direction: column;
        justify-content: center;

        .title {
            font-weight: 800;
            font-size: 32px;
        }
        .description {
            opacity: 0.9;
            font-size: 16px;
        }
    }
    .actions {
        grid-area: actions;
        align-self: center;
        display: flex;
        flex-direction: row-reverse;
        align-items: center;
        justify-content: flex-start;
        flex-wrap: wrap;
        gap: 10px;

        .action {
            padding: 10px 20px;
            font-size: 15px;
            font-weight: bold;
            border-radius: 18px;
            background-color: #33323c;
            transition: background-color 0.3s ease, opacity 0.3s ease;

            &:hover {
                opacity: 0.8;
                background-color: #33323cd3;
            }

            &.primary {
                background-color: #09caaa;
                color: black;

                &:hover {
                    background-color: #07a086;
                }
            }
        }
    }
}
@media screen and (max-width: 800px) {
    .head {
        grid-template-columns: fit-content(100%) auto;
        grid-template-areas:
            "icon text"
            "icon actions";
        .text {
            .title {
                font-size: 25px;
            }
        }
        .actions {
            flex-direction: row;

            .action {
                font-size: 14px;
                padding: 10px 16px;
            }
        }
    }
}
</style>