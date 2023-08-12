// Import React and ReactDOM
import React from 'react';

import { createRoot } from 'react-dom/client';

import 'zmp-ui/zaui.css';

import './css/tailwind.css';
import './css/app.scss';

// Import App Component
import appConfig from '../app-config.json';

import App from './ui/app';

if (!window.APP_CONFIG) {
  (window.APP_CONFIG as any) = appConfig;
}

// Mount React App
const root = createRoot(document.getElementById('app')!);
root.render(React.createElement(App));
