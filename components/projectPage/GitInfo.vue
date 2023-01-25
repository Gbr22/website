<script setup lang="ts">
import { localize } from '~~/localization';
import { injectCurrentProject } from '../../composables/useData';
let project = injectCurrentProject();

let licenseText = localize({ hu: "Zárt forrású", en: "Closed source" });

if (!project.isPrivate){
    licenseText = localize({ hu: "Nincs licenc", en: "No license" });

    if (project.license?.spdxId){
        licenseText = project.license.spdxId + " " + localize({ hu: "licenc", en: "license" });
    }
}

interface LanguageInfo {
    name: string
    ammount: number
    absolutePercentage: number
    relativePercentage: number
    color: string | undefined
}

let langColors: {[name: string]: string} = {
    "Vue":"#2cb03a",
    "JavaScript":"#dead3c",
    "TypeScript":"#0074D9",
    "CSS":"#0d87f2",
    "SCSS":"#cf649a",
    "HTML":"#e6544c",
    "Dockerfile":"#61b0cf",
    "Batchfile":"#a9db3b",
    "Shell":"#00c255",
    "Java":"#996633",
    "Ruby":"#e6544c",
    "Objective-C":"#0099ff",
    "Dart":"#0099ff",
    "C":"#bfbfbf"
}

let languages: LanguageInfo[] | undefined = undefined;

if (project.languageStats){
    let sum = Object.values(project.languageStats).reduce((accum, e)=>e+accum,0);
    let topAmmount = Object.values(project.languageStats).sort((a,b)=>b-a)[0];
    languages = Object.entries(project.languageStats).map(([name,ammount])=>{
        return {
            name,
            ammount,
            absolutePercentage: ammount / sum,
            relativePercentage: ammount / topAmmount,
            color: langColors[name]
        }
    })
}

function formatPercentage(n: number){
    n *= 100;
    return n.toFixed(2)+"%";
}

</script>

<template>
    <div class="container" v-if="project.github">
        <div class="card repo">
            <div class="inner">
                <h4 class="title">{{ localize({ hu: "Forráskód", en: "Source code" }) }}</h4>
                <a
                    target="_blank"
                    :href="'https://github.com/'+project.github.name"
                >
                    {{ project.github.name.split('/')[0] }}{{ '/' }}<wbr />{{ project.github.name.split('/')[1] }}
                </a>
                <div>{{ licenseText }}</div>
            </div>
        </div>
        <div class="card stats">
            <div class="inner">
                <div class="rows">
                    <div class="row" v-if="project.showReleases">
                        <span class="text">{{ localize({ hu: "Letöltések", en: "Downloads" }) }}</span>
                        <span class="number">
                            {{ project.downloadCount }}
                        </span>
                    </div>
                    <a
                        class="row"
                        :href="'https://github.com/'+project.github.name+'/stargazers'"
                    >
                        <span class="text">
                            {{ localize({ hu: "Csillagok", en: "Stars" }) }}
                        </span>
                        <span class="number">
                            {{ project.starsCount }}
                        </span>
                    </a>
                    <a
                        class="row"
                        :href="'https://github.com/'+project.github.name+'/watchers'"
                    >
                        <span class="text">
                            {{ localize({ hu: "Figyelők", en: "Watchers" }) }}
                        </span>
                        <span class="number">
                            {{ project.watchersCount }}
                        </span>
                    </a>
                    <a
                        class="row"
                        :href="'https://github.com/'+project.github.name+'/issues?q=is%3Aopen'"
                    >
                        <span class="text">
                            {{ localize({ hu: "Ügyek", en: "Issues" }) }}
                        </span>
                        <span class="number">
                            {{ project.openIssuesCount }}
                        </span>
                    </a>
                    <a
                        class="row"
                        :href="'https://github.com/'+project.github.name+'/network/members'"
                    >
                        <span class="text">
                            {{ localize({ hu: "Forkok", en: "Forks" }) }}
                        </span>
                        <span class="number">
                            {{ project.forksCount }}
                        </span>
                    </a>
                </div>
            </div>
        </div>
        <div class="card languages">
            <div class="inner">
                <h4 class="title">{{ localize({ hu: "Nyelvek", en: "Languages" }) }}</h4>
                <div class="diagram">
                    <div
                        class="line"
                        v-for="lang in languages"
                        :style="{
                            //width: lang.relativePercentage*100 + '%',
                            flex: lang.absolutePercentage,
                            backgroundColor: lang.color
                        }"
                    >
                    </div>
                </div>
                <div class="caption">
                    <span class="item" v-for="lang in languages">
                        <span class="name">{{ lang.name }}</span>
                        <span
                            class="percentage"
                            :style="{ backgroundColor: lang.color }"
                        >{{ formatPercentage(lang.absolutePercentage) }}</span>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.container {
    margin-top: var(--section-spacing);
    padding: 0 var(--page-padding);
    display: flex;
    flex-direction: row;
    overflow: hidden;
    max-width: 100%;

    gap: 20px;

    .repo {
        grid-area: repo;
        flex: 1;

        text-align: center;
        .title {
            margin-bottom: 10px;
        }

        a {
            color: #09caaa;
        }
    }
    .stats {
        grid-area: stats;
        flex: 1;

        .rows {
            .row {
                display: flex;
                justify-content: space-between;
                gap: 15px;
            }

            a:hover {
                color: #09caaa;
            }
        }
    }
    .languages {
        grid-area: languages;
        flex: 2;

        .title {
            text-align: center;
        }

        .diagram {
            margin: 15px 0;
            background-color: rgb(55, 53, 62);
            border-radius: 8px;
            border: 2px solid rgb(55, 53, 62);
            overflow: hidden;
            height: 26px;
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: center;
            justify-self: center;
            gap: 2px;

            .line {
                background-color: white;
                min-width: 6px;
                border-radius: 1px;
            }
        }
        .caption {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            gap: 12px;
            justify-content: center;

            .item {
                display: flex;
                gap: 5px;

                .percentage {
                    background-color: white;
                    color: black;
                    font-weight: bold;
                    border-radius: 6px;
                    padding: 2px 4px;
                    font-size: 0.8em;
                }
            }
        }
    }

    .card {
        font-size: 15px;
        
        .inner {
            border-radius: 12px;
            padding: 20px;
            background-color: rgb(41, 40, 48);
        }

        .title {
            font-weight: 700;
            font-size: 17px;
        }
    }
}

@media screen and (max-width: 800px) {
    .container {
        display: grid;
        grid-template-columns: auto auto;
        grid-template-areas:
        "repo stats"
        "languages languages";
    }
}
@media screen and (max-width: 400px) {
    .container {
        display: flex;
        flex-direction: column;

        .stats {
            .rows {
                margin: auto;
                width: min-content;
                .row {
                    gap: 20vw;
                }
            }
        }
    }
}
</style>