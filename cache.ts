import * as Path from 'path';
import { existsSync } from 'fs';
import { lstat, writeFile, readFile } from 'fs/promises';
import { tmpdir } from 'os';

let tmpPath = tmpdir();

export async function cachedFetch(url: string, options: RequestInit, cacheKey: string, cacheTimeMs: number){
    let file = Path.join(tmpPath,cacheKey+".cache");

    function obtainAndCache(){
        return fetch(url, options).then(async r=>{
            let text = await r.text();
            writeFile(file,text).catch(console.error); // note: don't await the file write
            return text;
        })
    }

    if (existsSync(file)){
        let stat = await lstat(file);
        let timeOfLastFetch = stat.mtime.valueOf();
        let time = Date.now();
        let timeSinceLastFetch = time - timeOfLastFetch;
        if (timeSinceLastFetch >= cacheTimeMs){
            obtainAndCache().catch(console.error); // note: don't await the request
        }
        let text = String(await readFile(file));
        return text;
    } else {
        return obtainAndCache();
    }
}