import React from 'react';
import { createRoot } from 'react-dom';
import { Demo } from './demo';

createRoot(document.getElementById('container')).render(
  <React.StrictMode>
    <Demo />
  </React.StrictMode>
);