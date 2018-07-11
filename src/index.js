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
import * as currencyRatesActions from "./store/currency_rates/actions";


// Create a history of your choosing (we're using a browser history in this case)
const history = createHashHistory({
    hashType: 'noslash'
});

// Build the middleware for intercepting and dispatching navigation actions
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

let canBack = false;
let canForward = false;

VKConnect.subscribe(function(e) {
    e = e.detail;
    switch (e['type']) {
        case 'VKWebAppGoBack':
            history.goBack();
            break;

        case 'VKWebAppGoForward':
            history.goForward();
            break;
        default:
            //nop
    }
});

history.listen((location, action) => {
   if (action === 'POP') {
       VKConnect.send('VKWebAppViewUpdateNavigationState', {'can_back': canBack, 'can_forward': canForward});
   } else if (action === 'PUSH') {
       VKConnect.send('VKWebAppViewUpdateNavigationState', {'can_back': canBack, 'can_forward': canForward});
   }
});

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
