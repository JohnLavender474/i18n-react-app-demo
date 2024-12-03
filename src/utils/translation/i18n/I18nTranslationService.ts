import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {en} from './locales/en/en'
import {fr} from './locales/fr/fr';
import {ITranslationService} from "../ITranslationService";
import {EN, FR} from "../locales";
import {Translations} from "../types";

export interface I18nParams {
    translations?: Translations;
    lng?: string;
    fallbackLng?: string;
    interpolation?: {
        escapeValue: boolean;
    };
    debug?: boolean;
}

export class I18nTranslationService implements ITranslationService {

    private i18nInstance: typeof i18n;

    constructor(params: I18nParams = {}) {
        const mergedParams: I18nParams = {
            translations: params.translations || I18nTranslationService.DEFAULT_TRANSLATIONS,
            lng: params.lng || EN,
            fallbackLng: params.fallbackLng || FR,
            interpolation: params.interpolation || {
                escapeValue: false
            },
            debug: params.debug ?? false,
        };

        this.i18nInstance = i18n.createInstance();
        this.i18nInstance
            .use(initReactI18next)
            .init({
                resources: mergedParams.translations,
                lng: mergedParams.lng,
                fallbackLng: mergedParams.fallbackLng,
                interpolation: mergedParams.interpolation,
                debug: mergedParams.debug,
            })
            .then(() => console.log("i18n initialized", this.i18nInstance.isInitialized))
            .catch((e) => console.error(e));

        console.debug("en:", en);
        console.debug("fr:", fr);
    }

    get(key: string, count?: number): string {
        return this.i18nInstance.t(key, {count});
    }

    static readonly DEFAULT_TRANSLATIONS: Translations = {
        en: en,
        fr: fr
    };
}