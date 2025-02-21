import React, { useState } from 'react';
import './App.css';

function App() {
  const [currentTab, setCurrentTab] = useState('summarize');
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [targetLanguage, setTargetLanguage] = useState('en'); // Default to English

  const handleTabClick = (tab) => {
    setCurrentTab(tab);
  };

  const processText = (text) => {
    switch (currentTab) {
      case 'summarize':
        return `Summary: ${text.split('.')[0]}...`; // Simple demo - returns first sentence
      case 'translate':
        return `Translation (${targetLanguage}): ${text} (Translated to ${getLanguageName(targetLanguage)})`; // Demo translation
      case 'detect':
        return `Detected Language: English (Confidence: 95%)`; // Demo detection
      default:
        return 'Unknown processing type';
    }
  };

  const getLanguageName = (code) => {
    const languages = {
      en: 'English',
      pt: 'Portuguese',
      es: 'Spanish',
      ru: 'Russian',
      tr: 'Turkish',
      fr: 'French',
    };
    return languages[code] || 'Unknown';
  };

  const handleProcessClick = () => {
    if (!inputText.trim()) return;

    // Add user message
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: inputText, isUser: true },
    ]);

    // Simulate processing delay
    setIsProcessing(true);

    setTimeout(() => {
      const result = processText(inputText);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: result, isUser: false },
      ]);

      // Reset input and button
      setInputText('');
      setIsProcessing(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleProcessClick();
    }
  };

  return (
    <div className="container">
      <header className="header">
        <div className="logo">
          <img src="/logo.svg" alt="Logo" className="rotatingLogo" />
        </div>
        <h1 className="title">Margnify</h1>
      </header>

      <main className="main-content">
        <div className="tabs">
          <button
            className={`tab ${currentTab === 'summarize' ? 'active' : ''}`}
            onClick={() => handleTabClick('summarize')}
          >
            <span>Summarize</span>
          </button>
          <button
            className={`tab ${currentTab === 'translate' ? 'active' : ''}`}
            onClick={() => handleTabClick('translate')}
          >
            <span>Translate</span>
          </button>
          <button
            className={`tab ${currentTab === 'detect' ? 'active' : ''}`}
            onClick={() => handleTabClick('detect')}
          >
            <span>Detect Language</span>
          </button>
        </div>

        {currentTab === 'translate' && (
          <div className="language-selector">
            <label htmlFor="language">Translate to:</label>
            <select
              id="language"
              value={targetLanguage}
              onChange={(e) => setTargetLanguage(e.target.value)}
            >
              <option value="en">English (en)</option>
              <option value="pt">Portuguese (pt)</option>
              <option value="es">Spanish (es)</option>
              <option value="ru">Russian (ru)</option>
              <option value="tr">Turkish (tr)</option>
              <option value="fr">French (fr)</option>
            </select>
          </div>
        )}

        <div className="chat-area">
          <div className="messages" id="output">
            {messages.length === 0 ? (
              <div className="message-placeholder">Your processed text will appear here...</div>
            ) : (
              messages.map((message, index) => (
                <div
                  key={index}
                  className={`message ${message.isUser ? 'user-message' : 'system-message'}`}
                >
                  {message.text}
                </div>
              ))
            )}
          </div>
        </div>

        <div className="input-area">
          <div className="input-wrapper">
            <textarea
              id="input"
              placeholder="Enter your text here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button
              className="process-btn"
              onClick={handleProcessClick}
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Send'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;