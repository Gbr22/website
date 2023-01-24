import { readFileSync } from 'fs';
import { getProjectData, getProjects, getProjectConfigs } from '~~/data';

export default defineEventHandler((event) => {
    return getProjects();
});