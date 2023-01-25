import { getProjectConfigs } from "./data"
import dataValidation from "./modules/dataValidation"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        dataValidation,
        'nuxt-icons'
    ],
    runtimeConfig: {
        GITHUB_TOKEN: String(process.env.GITHUB_TOKEN)
    }
})
