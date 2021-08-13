/*
 * Copyright (c) 2021. Prototype
 */

import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';
import React from 'react';
import { hydrate, render } from 'react-dom';
import reportWebVitals from './reportWebVitals';
import App from './pages/App';
import { I18nextProvider } from 'react-i18next';
import i18n from './service/i18n';

const app = (
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <App/>
    </I18nextProvider>
  </React.StrictMode>
);

const rootElement = document.getElementById('root');
if (rootElement?.hasChildNodes() && i18n.language === 'ru') {
  hydrate(app, rootElement);
} else {
  render(app, rootElement);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
