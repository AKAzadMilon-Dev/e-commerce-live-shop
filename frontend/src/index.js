import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HelmetProvider } from 'react-helmet-async';
import {BrowserRouter} from "react-router-dom";
import './index.css';
import App from './App';
import {StoreProvider} from './Store'

ReactDOM.render(<BrowserRouter><StoreProvider><HelmetProvider><App/></HelmetProvider></StoreProvider></BrowserRouter>,document.getElementById('root'));

