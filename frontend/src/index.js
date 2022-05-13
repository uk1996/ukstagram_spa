import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'antd/dist/antd.min.css';
import './index.css';
import Root from './pages';
import { AppProvider } from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <AppProvider>
            <Root />
        </AppProvider>
    </BrowserRouter>,
);
