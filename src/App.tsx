import React, {useEffect, useState} from 'react';
import './App.css';
import logo from './logo.svg';
import {I18nTranslationService} from "./utils/translation/i18n/I18nTranslationService";
import en from '../public/locales/en/translation.json';
import fr from '../public/locales/fr/translation.json';

const i18nService = new I18nTranslationService({
    translations: {
        en: {
            translation: en
        },
        fr: {
            translation: fr
        }
    },
    lng: 'en',
    fallbackLng: 'en',
    debug: true,
    interpolation: {
        escapeValue: false
    },
});

function App() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        setLoading(true);
        i18nService.init()
            .then((service) => {
                console.log("The i18n service is initialized:", service);
                setLoading(false);
            })
            .catch((e) => {
                console.error("Error initializing i18n service:", e);
                setLoading(false);
            });
    }, []);

    const getCurrentLanguage = (): string | null => {
        return i18nService.getCurrentLanguage();
    }

    const handleLanguageChange = async (lng: string) => {
        setLoading(true);
        await i18nService.changeLanguage(lng);
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
            case "en":
                newLng = "fr";
                text = "Change to French";
                break;
            case "fr":
                newLng = "en";
                text = "Changez en anglais";
                break;
            default:
                throw new Error(`Unsupported language: ${currentLng}`);
        }

        return (
            <button onClick={() => handleLanguageChange(newLng)}>{text}</button>
        )
    }

    if (loading) {
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
                    {i18nService.get("header.welcome")}
                </a>
                <p>
                    {i18nService.get("notifications.single")}
                </p>
                <p>
                    {i18nService.get("notifications.plural", {count: 5})}
                </p>
                <div>
                    {renderChangeLngButtons()}
                </div>
            </header>
        </div>
    );
}

export default App;
