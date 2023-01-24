import { readFileSync } from 'fs';
import { getProjectData } from '~~/data';
import { H3Response } from 'h3';

export default defineEventHandler((event) => {
    let id: string | undefined = event.context?.params?.id;
    if (!id){
        return;
    }
    return getProjectData(id);
});