import { z } from 'zod';
import { LocalizedText, LocalizedTextSchema } from './localization';
import { readdir, lstat, readFile } from 'fs/promises';
import { existsSync } from 'fs';
import { getLanguageStats, getReleases, getRepoInfo, LanguageStats, Release, RepoInfo } from './github';

const PROJECTS_DIR = "./public/data/projects/";

let AppShowcaseDefinitionSchema = z.object({
    sortIndex: z.number(),
    image: z.string()
});

type AppShowcaseDefinition = z.output<typeof AppShowcaseDefinitionSchema>

function isAppShowcaseDefinition(obj: any): obj is AppShowcaseDefinition {
    let result = AppShowcaseDefinitionSchema.safeParse(obj);
    return result.success;
}

let ProjectInfoSchema = z.object({
    title: LocalizedTextSchema,
    description: LocalizedTextSchema,
    longDescription: z.optional(LocalizedTextSchema),
    github: z.optional(z.object({
        name: z.string(),
        showReleases: z.optional(z.boolean()).default(false)
    })),
    icon: z.optional(z.object({
        showBorder: z.optional(z.boolean()).default(true)
    })).default({
        showBorder: true
    }),
    actions: z.optional(z.record(z.string(),z.string())).default({}),
    appShowcase: z.optional(AppShowcaseDefinitionSchema),
    downloadCount: z.optional(z.number()),
    showReleases: z.optional(z.boolean()).default(false),
    sortIndex: z.optional(z.number()).default(Infinity),
    embed: z.optional(z.object({
        src: z.string(),
        minHeight: z.optional(z.number())
    }))
})

export async function getProjectConfigs(){
    let contents = await readdir(PROJECTS_DIR);
    let promises = contents.map(e=>getProjectConfig(e));
    let projects = (await Promise.all(promises)).filter(e=>e != undefined) as ProjectConfig[];
    return projects;
}

export interface Project {
    id: string
    title: LocalizedText
    description: LocalizedText,
    icon: Icon
}

export async function getProjects(): Promise<Project[]> {
    let projects = await getProjectConfigs();

    return projects
        .sort((a,b)=>{
            return a.sortIndex - b.sortIndex;
        })
        .map(project=>{ // only return relevant fields
            return {
                id: project.id,
                title: project.title,
                description: project.description,
                icon: project.icon
            }
        })
}

interface Icon {
    showBorder: boolean
    src: string
}

export interface ShowcasedApp {
    id: string
    icon: Icon
    title: LocalizedText
    image: string
    downloadCount: number
}

export async function getShowcasedApps(): Promise<ShowcasedApp[]> {
    let projects = await getProjectConfigs();

    interface ProjectWithShowcase extends ProjectConfig {
        appShowcase: AppShowcaseDefinition
    }

    let showcaseList = projects.filter((project)=>isAppShowcaseDefinition(project.appShowcase)) as ProjectWithShowcase[];
    
    let promises = showcaseList
    .sort((a,b)=>{
        return a.appShowcase.sortIndex - b.appShowcase.sortIndex;
    })
    .map(async project=>{
        let downloadCount = project.downloadCount || 0;

        if (project.github){
            let releaseData = await getReleases(project.github.name);
            downloadCount += releaseData.downloadCount;
        }

        return {
            id: project.id,
            icon: project.icon,
            title: project.title,
            image: project.appShowcase.image,
            downloadCount
        }
    });

    return Promise.all(promises);
}

export async function getProjectData(id: string) {
    let config = await getProjectConfig(id);
    if (!config){
        return;
    }
    let downloadCount = config.downloadCount;

    let releases: Release[] | undefined;
    let languageStats: LanguageStats | undefined;
    let repoInfo: RepoInfo | undefined;
    
    if (config.github){
        languageStats = await getLanguageStats(config.github.name);
        repoInfo = await getRepoInfo(config.github.name);

        if (config.showReleases){
            let releaseData = await getReleases(config.github.name);
            if (!downloadCount){
                downloadCount = 0;
            }
            downloadCount += releaseData.downloadCount;
            releases = releaseData.releases;
        }
    }
    return {
        ...config,
        ...repoInfo,
        downloadCount,
        releases,
        languageStats,
    };
}

export type ProjectData = NonNullable<Awaited<ReturnType<typeof getProjectData>>>

export async function getProjectConfig(id: string) {
    let dir = `${PROJECTS_DIR}${id}/`;
    if (!existsSync(dir)){
        return;
    }
    let dirInfo = await lstat(dir);
    if (!dirInfo.isDirectory()){
        return;
    }
    let contents = await readdir(dir);

    function findFile(name: string){
        let fullname = contents.find(e=>e.startsWith(name+"."));
        if (!fullname){
            return;
        }
        let parts = fullname.split('.');
        parts.shift(); // remove name
        let ext = parts.join(".");
        return {
            fullname,
            name,
            ext
        }
    }

    if (!contents.includes("info.json")){
        throw new Error("info.json missing");
    }

    let infoUnsafe = JSON.parse(String(await readFile(dir+"info.json")));
    let info = ProjectInfoSchema.parse(infoUnsafe);

    let icon = findFile("icon");
    if (!icon){
        throw new Error("icon missing");
    }

    let hasImages = contents.includes("images");

    let images: string[] | undefined;

    if (hasImages){
        images = (await readdir(dir+"images")).map(e=>`/data/projects/${id}/images/${e}`)
    }


    if (info.appShowcase){
        info.appShowcase.image = `/data/projects/${id}/images/${info.appShowcase.image}`;
    }

    return {
        ...info,
        id,
        icon:{
            showBorder:info.icon.showBorder,
            src:`/data/projects/${id}/${icon.fullname}`
        },
        images,
    }
}

export type ProjectConfig = NonNullable<Awaited<ReturnType<typeof getProjectConfig>>>