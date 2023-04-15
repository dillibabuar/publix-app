import React from 'react';
import { Router } from 'react-router-dom';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'; 
import { ConnectedRouter } from 'connected-react-router'
import { history, store } from './_helpers';
import { accountService } from './_services';
import { App } from './app/Index';
import { LeftMenu } from './_components/LeftMenu/leftmenu';
import { Header } from './_components/Header/header';
import { Footer } from './_components/Footer/footer';
import './assets/css/style.css';
import './assets/css/bootstrap.css';
import './assets/js/bootstrap.min.js';
import './assets/js/jquery-1.11.1.min.js';

import { configureFakeBackend } from './_helpers';
configureFakeBackend();



render(
    <Provider store={store}>
        <Header />
        <LeftMenu/>
        <App />
        <Footer />
    </Provider>,
    document.getElementById('app')
);

/* accountService.refreshToken().finally(startApp);

function startApp() { 
    render(
          
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
    );
}  */

