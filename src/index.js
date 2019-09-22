import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

import 'antd/dist/antd.css';
import App from './App';
import Store from './store/Store';

const stores = { Store };

ReactDOM.render(
    <Provider {...stores} >
        <App />
    </Provider>,
    document.getElementById('root')
);