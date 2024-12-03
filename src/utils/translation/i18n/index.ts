/*
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// public translation keys
export const HELLO_USER_KEY = "HELLO_USER_KEY";
export const REACT_WELCOME_KEY = "REACT_WELCOME_KEY";
export const NOTIFICATIONS_KEY = "NOTIFICATIONS_KEY"; // to make it plural or singular, use the count variable

// private variables (should not be used outside this file)
const COUNT_VAR = "{{count}}";

// private translation modifiers (should not be used outside this file)
const ONE = "_one"; // for singular
const OTHER = "_other"; // for plural

// private translation keys (should not be used outside this file)
const SINGLE_NOTIFICATION_KEY = `${NOTIFICATIONS_KEY}${ONE}`; // this is private because it's used in the translation of NOTIFICATIONS_KEY to provide the singular form
const PLURAL_NOTIFICATIONS_KEY = `${NOTIFICATIONS_KEY}${OTHER}`; // this is private because it's used in the translation of NOTIFICATIONS_KEY to provide the plural form

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: h
// ttps://react.i18next.com/guides/multiple-translation-files)
//
// to use a variable as the key, use the square bracket notation
// to use a hardcoded string (not recommended), do the following:
// "key": "value"
const resources = {
    en: {
        translation: {
            // the 1 is the index of the string inside the <i> tag
            // the 3 is the index of the string inside the <b> tag
            // the string is split into an array of strings,
            // and the indexes are used to replace the strings
            [HELLO_USER_KEY]: "Hello, <1>user</1>. <3>Test</3>",

            [REACT_WELCOME_KEY]: "Welcome to React and react-i18next",
            [SINGLE_NOTIFICATION_KEY]: "You have 1 notification",
            [PLURAL_NOTIFICATIONS_KEY]: `You have ${COUNT_VAR} notifications`
        }
    },
    fr: {
        translation: {
            // see comment in the en translation about the indexes
            [HELLO_USER_KEY]: "Bonjour, <1>utilisateur</1>. <3>Test</3>",

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

 */
export {};