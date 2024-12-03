import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// private variables
const COUNT_VAR = "{{count}}";

// public translation keys
export const REACT_WELCOME_KEY = "REACT_WELCOME_KEY";
export const NOTIFICATIONS_KEY = "NOTIFICATIONS_KEY";

// private translation modifiers
const ONE = "_one";
const OTHER = "_other";

// private translation keys
const SINGLE_NOTIFICATION_KEY = `${NOTIFICATIONS_KEY}${ONE}`;
const PLURAL_NOTIFICATIONS_KEY = `${NOTIFICATIONS_KEY}${OTHER}`;

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
    en: {
        translation: {
            [REACT_WELCOME_KEY]: "Welcome to React and react-i18next",
            [SINGLE_NOTIFICATION_KEY]: "You have 1 notification",
            [PLURAL_NOTIFICATIONS_KEY]: `You have ${COUNT_VAR} notifications`
        }
    },
    fr: {
        translation: {
            [REACT_WELCOME_KEY]: "Bienvenue à React et react-i18next",
            [SINGLE_NOTIFICATION_KEY]: "Vous avez 1 notification",
            [PLURAL_NOTIFICATIONS_KEY]: `Vous avez ${COUNT_VAR} notifications`
        }
    }
};

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        fallbackLng: "en", // use en if detected lng is not available
        lng: "fr", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
        // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
        // if you're using a language detector, do not define the lng option

        interpolation: {
            escapeValue: false // react already safes from xss
        }
    })
    .catch( e => console.error( e ) );

export default i18n;