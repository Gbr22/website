import { string, z } from "zod";
import { isValidLanguageCode, LocalizationMap, LocalizedText, SupportedLanguages } from "./localization";
import { cachedFetch } from "./cache";

const MINUTE = 1000 * 60;

function fetchGithub(endpoint: string){
    let config = useRuntimeConfig();

    const GITHUB_API_ROOT = "https://api.github.com/";
    let cacheKey = "github_"+endpoint.split("/").join("_");
    return cachedFetch(GITHUB_API_ROOT+endpoint,{
        headers: {
            Authorization: `Bearer ${config.GITHUB_TOKEN}`
        }
    },cacheKey,MINUTE).then(text=>{
        return JSON.parse(text);
    })
}

let AssetSchema = z.object({
    download_count: z.number(),
    browser_download_url: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
    name: z.string(),
    id: z.number(),
})

let ReleaseSchema = z.object({
    name: z.string(),
    tag_name: z.string(),
    created_at: z.string(),
    published_at: z.string(),
    assets: z.array(AssetSchema),
    body: z.string(),
    id: z.number(),
})

let ReleasesSchema = z.array(ReleaseSchema);
export interface Asset {
    name: string
    id: number
    downloadUrl: string
    createdAt: string
    updatedAt: string
}
export interface Release {
    name: string
    tagName: string
    publishedAt: string
    body: LocalizedText
    assets: Asset[]
    id: number
}

function parseAsLocalizedText(text: string): LocalizedText {
    let isMultilingual = SupportedLanguages.every(langCode=>{
        let tag = `_- ${langCode} -_`;
        return text.includes(tag);
    })
    if (!isMultilingual){
        return text;
    }
    let langMap = {} as LocalizationMap;
    SupportedLanguages.forEach(langCode=>{
        langMap[langCode] = "";
    })
    let regex = /_-\s\w{2}\s-_/g; // match "_- xx -_"
    let matches = [...text.match(regex) || []];
    let parts = text.split(regex);
    parts.shift(); // remove content before the first tag
    parts.forEach((part,index)=>{
        let tag = matches[index];
        let langCode = tag.replace("_- ","").replace(" -_","");
        if (!isValidLanguageCode(langCode)){
            return;
        }
        langMap[langCode] = part.trim();
    })
    return langMap;
}

export async function getReleases(name: string){
    let object = await fetchGithub(`repos/${name}/releases`);
    let releases = ReleasesSchema.parse(object);
    let downloadCount = 0;
    releases.forEach(release=>{
        release.assets.forEach(asset=>{
            downloadCount += asset.download_count;
        })
    });
    let processedReleases = releases.map(release=>{
        let processedAssets = release.assets.map(asset=>{
            let assetResult: Asset = {
                name: asset.name,
                id: asset.id,
                createdAt: asset.created_at,
                updatedAt: asset.updated_at,
                downloadUrl: asset.browser_download_url
            };
            return assetResult;
        })

        let body = parseAsLocalizedText(release.body);

        let releaseResult: Release = {
            name: release.name,
            tagName: release.tag_name,
            publishedAt: release.published_at,
            body,
            assets: processedAssets,
            id: release.id
        }
        return releaseResult;
    });
    return {
        downloadCount,
        releases: processedReleases
    }
}

let RepoInfoSchema = z.object({
    stargazers_count: z.number(),
    subscribers_count: z.number(),
    open_issues_count: z.number(),
    forks_count: z.number(),
    license: z.object({
        spdx_id: z.string(),
    }).or(z.null()),
    private: z.boolean()
})

interface License {
    spdxId: string
}

export interface RepoInfo {
    starsCount: number
    watchersCount: number
    openIssuesCount: number
    forksCount: number
    license: License | undefined
    isPrivate: boolean
}

export async function getRepoInfo(name: string): Promise<RepoInfo> {
    let object = await fetchGithub(`repos/${name}`);
    let repoInfo = RepoInfoSchema.parse(object);

    let license: License | undefined;

    if (repoInfo.license){
        license = {
            spdxId: repoInfo.license.spdx_id
        }
    }

    return {
        starsCount: repoInfo.stargazers_count,
        watchersCount: repoInfo.subscribers_count,
        openIssuesCount: repoInfo.open_issues_count,
        forksCount: repoInfo.forks_count,
        license,
        isPrivate: repoInfo.private,
    }
}

let LanguageStatsSchema = z.record(z.string(), z.number());

export type LanguageStats = z.infer<typeof LanguageStatsSchema>;

export async function getLanguageStats(name: string) {
    let object = await fetchGithub(`repos/${name}/languages`);
    let stats = LanguageStatsSchema.parse(object);
    return stats;
}