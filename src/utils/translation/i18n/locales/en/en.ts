import {HELLO_USER_KEY, PLURAL_NOTIFICATIONS_KEY, REACT_WELCOME_KEY, SINGLE_NOTIFICATION_KEY} from "../../../keys";
import {TranslationRecord} from "../../../types";

export const en: TranslationRecord = {
    [HELLO_USER_KEY]: "Hello, <1>user</1>. <3>Test</3>",
    [REACT_WELCOME_KEY]: "Welcome to React and react-i18next",
    [SINGLE_NOTIFICATION_KEY]: "You have 1 notification",
    [PLURAL_NOTIFICATIONS_KEY]: "You have {{count}} notifications"
};
