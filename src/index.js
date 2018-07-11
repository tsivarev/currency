import React from 'react';
import ReactDOM from 'react-dom';
import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import {createHashHistory} from 'history';
import {routerMiddleware} from 'react-router-redux';
import thunk from 'redux-thunk';
import {rootReducer} from './store/reducers';
import registerServiceWorker from './registerServiceWorker';
import Root from './containers/Root';

const history = createHashHistory({
    hashType: 'noslash'
});

const logger = store => next => action => {
    console.log('dispatching', action);
    return next(action);
};

const store = createStore(
    rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk, routerMiddleware(history), logger)
);

ReactDOM.render(
    <Provider store={store}>
        <Root history={history}/>
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
