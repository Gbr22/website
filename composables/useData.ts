import { ProjectConfig, ProjectData } from "../data";
import { Ref } from 'vue';
import { localize } from "~~/localization";

export async function useProjects(){
    return await useFetch("/api/projects", { server: true, key: "projects" });
}
export async function useShowcasedApps(){
    return await useFetch("/api/showcasedapps", { server: true, key: "showcasedapps" });
}
export async function useProject(id: string){
    return await useFetch<ProjectData>("/api/project/"+id, { server: true, key:`project/${id}` });
}
export function useProjectId(){
    let route = useRoute();
    let id = String(route.params.id);
    return id;
}
export async function useCurrentProject(){
    let id = useProjectId();
    return useProject(id);
}
export function injectCurrentProject(){
    let project = inject<ProjectData>("project");

    if (project == undefined){
        throw createError({ statusCode: 404, statusMessage: localize( {
            hu: "Projekt nem található",
            en: "Project not found"
        }) });
    }

    return project;
}