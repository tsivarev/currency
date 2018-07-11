import React from 'react';
import ReactDOM from 'react-dom';
import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import {createHashHistory} from 'history';
import {ConnectedRouter, routerMiddleware} from 'react-router-redux';
import thunk from 'redux-thunk';
import {Route} from 'react-router';
import * as VKConnect from '@vkontakte/vkui-connect';
import App from './App';
import About from './About';
import {rootReducer} from './store/reducers';
import registerServiceWorker from './registerServiceWorker';
import * as currencyRatesActions from './store/currency_rates/actions';

const history = createHashHistory({
    hashType: 'noslash'
});

const reduxRouterMiddleware = routerMiddleware(history);

const logger = store => next => action => {
    console.log('dispatching', action);
    return next(action);
};

const store = createStore(
    rootReducer, {},
    applyMiddleware(thunk, reduxRouterMiddleware, logger)
);

VKConnect.send('VKWebAppInit', {});

store.dispatch(currencyRatesActions.fetchUsdEurRate());
store.dispatch(currencyRatesActions.fetchCbrCurrencyRates());

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div>
                <Route exact path='/' component={App}/>
                <Route path='/about' component={About}/>
            </div>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
