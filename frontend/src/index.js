import React from 'react';
import ReactDOM from 'react-dom';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import 'bootstrap/dist/css/bootstrap.min.css';
import { HelmetProvider } from 'react-helmet-async';
import {BrowserRouter} from "react-router-dom";
import './index.css';
import App from './App';
import {StoreProvider} from './Store'

ReactDOM.render(
<BrowserRouter>
    <StoreProvider>
        <HelmetProvider>
            <PayPalScriptProvider deferLoading={true}>
                <App/>
            </PayPalScriptProvider>
        </HelmetProvider>
    </StoreProvider>
</BrowserRouter>,document.getElementById('root'));

