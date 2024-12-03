import React from 'react';
import logo from './logo.svg';
import './App.css';
import './utils/i18next';
import {useTranslation} from "react-i18next";
import {NOTIFICATIONS_KEY, REACT_WELCOME_KEY} from "./utils/i18next";

function App() {
    const {t} = useTranslation();
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {t(REACT_WELCOME_KEY)}
                </a>
                <p>
                    {t(NOTIFICATIONS_KEY, {count: 1})}
                </p>
                <p>
                    {t(NOTIFICATIONS_KEY, {count: 5})}
                </p>
            </header>
        </div>
    );
}

export default App;
