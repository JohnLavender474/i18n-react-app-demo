import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {I18nTranslationService} from "./utils/translation/i18n/I18nTranslationService";
import {ITranslationService} from "./utils/translation/ITranslationService";
import {PLURAL_NOTIFICATIONS_KEY, REACT_WELCOME_KEY, SINGLE_NOTIFICATION_KEY} from "./utils/translation/keys";
import {FR} from "./utils/translation/locales";

const DEBUG_TRANSLATION = true;

function App() {
    const [translation, setTranslation] = useState<ITranslationService | null>(null);

    useEffect(() => {
        if (translation) {
            return;
        }

        const initializeService = async () => {
            const service = new I18nTranslationService({
                debug: DEBUG_TRANSLATION,
                lng: FR
            });
            await service.init();
            return service;
        };

        initializeService()
            .then((service: ITranslationService) => setTranslation(service))
            .catch(console.error);
    }, []);

    if (!translation) {
        return <div>Loading...</div>;
    }

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {translation.get(REACT_WELCOME_KEY)}
                </a>
                <p>
                    {translation.get(SINGLE_NOTIFICATION_KEY)}
                </p>
                <p>
                    {translation.get(PLURAL_NOTIFICATIONS_KEY, 5)}
                </p>
            </header>
        </div>
    );
}

export default App;
