import React from 'react';
import ReactDOM from 'react-dom/client';
import TimeTracker from './app/TimeTracker';
import 'semantic-ui-css/semantic.min.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TimeTracker />
  </React.StrictMode>,
);
