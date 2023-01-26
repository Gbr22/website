import { z } from 'zod';

export const SupportedLanguages = ["hu","en"] as const;
const DEFAULT_LANGUAGE = "en";
export type LanguageCode = typeof SupportedLanguages[number];

/**
 * Represents a snippet of multilingual data
 * eg: { hu: "Szöveg", en: "Text" }
 */
export type LocalizationMap = {
    [key in LanguageCode]: string;
};

/**
 * Represents a snippet of data that can be the same in all languages (string)
 * or is translated to multiple languages (LocalizationMap)
 */
export type LocalizedText = string | LocalizationMap;

function createLocalizationMapSchema(){
    let objectSignature = {} as {
        [key in LanguageCode]: z.ZodString;
    };
    SupportedLanguages.forEach(langCode=>{
        objectSignature[langCode] = z.string();
    })
    return z.object(objectSignature);
}

let LocalizationMapSchema = createLocalizationMapSchema();

export const LocalizedTextSchema = z.string().or(LocalizationMapSchema);

export function isValidLanguageCode(code: any): code is LanguageCode {
    return SupportedLanguages.includes(code);
}
/**
 * hu -> hu;
 * en-US -> en;
 * en-GB -> en;
 * es-ES -> undefined;
 */
function normalizeLanguageCode(code: string): LanguageCode | undefined {    
    if (isValidLanguageCode(code)){
        return code;
    }
    let parts = code.split("-");
    if (isValidLanguageCode(parts[0])){
        return parts[0];
    }

    return;
}

export function getCurrentLanguage(): LanguageCode {
    let headers = useRequestHeaders(["accept-language"]);
    let acceptLanguage = headers["accept-language"];
    let languagePreferenceList: LanguageCode[] = [];

    if (acceptLanguage){
        let languages = acceptLanguage
            .split(",")
            .map(lang=>{
                let parts = lang.split(";q=");
                let langCode = normalizeLanguageCode(parts[0]);
                let qualityValue: number = Number.parseFloat(parts[1]);
                //  ^^^ a number between 0 and 1 representing the user's order of preference
                //  1 represents the most preferred and it is also the default in case there is no value

                if (isNaN(qualityValue)){
                    qualityValue = 1;
                }
                return {
                    langCode,
                    qualityValue
                }
            })

        languages.sort((a,b)=>{ // descending order
            return b.qualityValue - a.qualityValue;
        });
        languagePreferenceList = languages
            .map(e=>e.langCode)
            .filter(e=>isValidLanguageCode(e)) as LanguageCode[];
        
    } else if (globalThis.hasOwnProperty("navigator") && navigator.languages){
        languagePreferenceList = navigator.languages
            .map(e=>normalizeLanguageCode(e))
            .filter(e=>isValidLanguageCode(e)) as LanguageCode[];
    }

    if (languagePreferenceList.length > 0){
        return languagePreferenceList[0];
    }

    return DEFAULT_LANGUAGE;
}

export function localize(value: LocalizedText){
    if (typeof value == "string"){
        return value;
    } else {
        let lang = getCurrentLanguage();
        return value[lang];
    }
}