import i18n, {InitOptions} from 'i18next';
import {initReactI18next} from 'react-i18next';
import {ITranslationService} from "../ITranslationService";

export interface I18nServiceParams {
    translations: any,
    lng?: string;
    fallbackLng?: string;
    interpolation?: {
        escapeValue: boolean;
    };
    debug?: boolean;
    changeLanguage?: (lng: string) => Promise<void>;
    onLanguageChange?: (lng: string) => void;
}

export interface I18nGetConfig {
    count?: number;
}

export class I18nTranslationService implements ITranslationService {

    private params: I18nServiceParams;
    private initialized = false;
    private i18nInstance!: typeof i18n;

    constructor(params: I18nServiceParams) {
        this.params = params;
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

        this.i18nInstance.on('languageChanged', (lng: string) => {
            console.log("Language changed to:", lng);

            if (this.params.onLanguageChange) {
                this.params.onLanguageChange(lng);
            }
        });

        this.initialized = true;
    }

    getCurrentLanguage(): string {
        if (!this.initialized) {
            throw Error("I18nTranslationService not initialized");
        }

        return this.i18nInstance.language;
    }

    async changeLanguage(lng: string): Promise<void> {
        if (!this.initialized) {
            throw Error("I18nTranslationService not initialized");
        }

        this.i18nInstance.changeLanguage(lng)
            .then(() => console.log("Language changed to:", lng))
            .catch((e) => console.error("Error changing language:", e));
    }

    get(key: string, config?: I18nGetConfig): string {
        if (!this.initialized) {
            throw Error("I18nTranslationService not initialized");
        }

        console.log("Fetching translation for key:", key);

        let result: string;
        if (config && config.count) {
            result = this.i18nInstance.t(key, {count: config.count});
        } else {
            result = this.i18nInstance.t(key);
        }

        console.log("Translation result:", result);

        return result;
    }
}