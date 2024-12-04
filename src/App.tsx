import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {I18nTranslationService} from "./utils/translation/i18n/I18nTranslationService";
import {PLURAL_NOTIFICATIONS_KEY, REACT_WELCOME_KEY, SINGLE_NOTIFICATION_KEY} from "./utils/translation/keys";
import {EN, FR} from "./utils/translation/locales";

const DEBUG_TRANSLATION = true;

function App() {
    const [translationService, setTranslationService] = useState<I18nTranslationService | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (translationService) {
            return;
        }

        const initializeService = async () => {
            const service = new I18nTranslationService({
                debug: DEBUG_TRANSLATION,
                lng: FR
            });
            await service.init();
            setTranslationService(service);
            return service;
        };

        setLoading(true);
        initializeService()
            .then((service) => {
                console.log("Service initialized", service);
                setLoading(false);
            })
            .catch((e) => {
                console.error(e);
                setLoading(false);
            });
    }, []);

    const getCurrentLanguage = (): string | null => {
        if (!translationService) {
            return null;
        }

        return translationService.getCurrentLanguage();
    }

    const handleLanguageChange = async (lng: string) => {
        if (!translationService) {
            console.error("Translation service not initialized");
            return;
        }

        setLoading(true);
        await translationService.changeLanguage(lng);
        setLoading(false);
    };
    const renderChangeLngButtons = () => {
        const currentLng = getCurrentLanguage();
        if (!currentLng) {
            return null;
        }

        let newLng = "ERROR: NO LANGUAGE SET";
        let text = "ERROR: NO BUTTON TEXT SET";
        switch (currentLng) {
            case EN:
                newLng = FR;
                text = "Change to French";
                break;
            case FR:
                newLng = EN;
                text = "Changez en anglais";
                break;
        }

        return (
            <button onClick={() => handleLanguageChange(newLng)}>{text}</button>
        )
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!translationService) {
        return <div><h1>Error initializing translation service</h1></div>;
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
                    {translationService.get(REACT_WELCOME_KEY)}
                </a>
                <p>
                    {translationService.get(SINGLE_NOTIFICATION_KEY)}
                </p>
                <p>
                    {translationService.get(PLURAL_NOTIFICATIONS_KEY, 5)}
                </p>
                <div>
                    {renderChangeLngButtons()}
                </div>
            </header>
        </div>
    );
}

export default App;
