import { defineNuxtModule } from '@nuxt/kit'
import { getProjectConfigs } from '../data';
export default defineNuxtModule({
  setup(options, nuxt) {
    nuxt.hook('build:before', async ()=>{
        return getProjectConfigs().then(()=>{
            console.log("Site data is valid");
        })
    })
  }
})