import React, { useState, useEffect } from 'react';
import './App.css';
import { answers } from './answers';
import { useTranslation } from 'react-i18next';

function App() {
  const { t, i18n } = useTranslation();
  const [answer, setAnswer] = useState('');
  const [theme, setTheme] = useState('light');

  const getRandomAnswer = () => {
    const currentLanguage = i18n.language.split('-')[0];
    const answerList = answers[currentLanguage] || answers.en;
    const randomIndex = Math.floor(Math.random() * answerList.length);
    setAnswer(answerList[randomIndex]);
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    getRandomAnswer();
  }, [i18n.language]);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div className="App">
      <div className="app-header-controls">
        <div className="language-controls">
          <button className="language-button" onClick={() => changeLanguage('en')}>English</button>
          <button className="language-button" onClick={() => changeLanguage('zh')}>中文</button>
        </div>
        <button className="theme-toggle-button" onClick={toggleTheme}>
          {t(theme === 'light' ? 'switchToDark' : 'switchToLight')}
        </button>
      </div>
      <div className="container">
        <h1>{t('title')}</h1>
        <p className="subtitle">{t('subtitle')}</p>
        <div className="answer-box">
          <p className="answer-text">{answer}</p>
        </div>
        <button className="button" onClick={getRandomAnswer}>
          {t('ask_again')}
        </button>
      </div>
    </div>
  );
}

export default App;
