import i18n, {InitOptions} from 'i18next';
import {initReactI18next} from 'react-i18next';
import {en} from './locales/en/en'
import {fr} from './locales/fr/fr';
import {ITranslationService} from "../ITranslationService";
import {EN} from "../locales";

export type I18nTranslationRecord = {
    translation: Record<string, string>;
}

export interface I18nServiceParams {
    translations?: Record<string, I18nTranslationRecord>;
    lng?: string;
    fallbackLng?: string;
    interpolation?: {
        escapeValue: boolean;
    };
    debug?: boolean;
}

export class I18nTranslationService implements ITranslationService {

    private params: I18nServiceParams;
    private initialized = false;
    private i18nInstance!: typeof i18n;

    constructor(params: I18nServiceParams = {}) {
        this.params = {
            translations: params.translations || I18nTranslationService.DEFAULT_TRANSLATIONS,
            lng: params.lng || EN,
            fallbackLng: params.fallbackLng || EN,
            interpolation: params.interpolation || {
                escapeValue: false
            },
            debug: params.debug ?? false,
        };
    }

    async init() {
        if (this.initialized) {
            console.warn("I18nTranslationService already initialized, no need to call init() again");
            return;
        }

        const options: InitOptions = {
            resources: this.params.translations,
            lng: this.params.lng,
            fallbackLng: this.params.fallbackLng,
            interpolation: this.params.interpolation,
            debug: this.params.debug,
        }

        this.i18nInstance = i18n.createInstance();
        await this.i18nInstance
            .use(initReactI18next)
            .init(options);

        console.log("i18n initialized:", this.i18nInstance.isInitialized);
        console.log("Current language:", this.i18nInstance.language);
        console.log("Available resources:", this.i18nInstance.store.data);

        this.i18nInstance.on('missingKey', (lng, ns, key) => {
            console.warn(`Missing key in ${lng}/${ns}: ${key}`);
        });

        this.initialized = true;
    }

    get(key: string, count?: number): string {
        if (!this.initialized) {
            throw Error("I18nTranslationService not initialized");
        }

        console.log("Fetching translation for key:", key);
        const result = this.i18nInstance.t(key, {count});
        console.log("Translation result:", result);

        return result;
    }

    static readonly DEFAULT_TRANSLATIONS: Record<string, I18nTranslationRecord> = {
        en: en,
        fr: fr
    };
}