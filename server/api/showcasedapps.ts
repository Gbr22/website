import { readFileSync } from 'fs';
import { getShowcasedApps } from '~~/data';

export default defineEventHandler((event) => {
    return getShowcasedApps();
});