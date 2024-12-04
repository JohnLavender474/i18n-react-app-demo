import {HELLO_USER_KEY, PLURAL_NOTIFICATIONS_KEY, REACT_WELCOME_KEY, SINGLE_NOTIFICATION_KEY} from '../../../keys';
import {I18nTranslationRecord} from "../../I18nTranslationService";

export const fr: I18nTranslationRecord = {
    translation: {
        [HELLO_USER_KEY]: "Bonjour, <1>utilisateur</1>. <3>Test</3>",
        [REACT_WELCOME_KEY]: "Bienvenue à React et react-i18next",
        [SINGLE_NOTIFICATION_KEY]: "Vous avez 1 notification",
        [PLURAL_NOTIFICATIONS_KEY]: "Vous avez {{count}} notifications"
    }
};
