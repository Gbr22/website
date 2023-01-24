import { ProjectConfig } from "~~/data";

export async function useProjects(){
    return await useFetch("/api/projects", { server: true, key: "projects" });
}
export async function useShowcasedApps(){
    return await useFetch("/api/showcasedapps", { server: true, key: "showcasedapps" });
}
export async function useProject(id: string){
    return await useFetch<ProjectConfig>("/api/project/"+id, { server: true, key:`project/${id}` });
}