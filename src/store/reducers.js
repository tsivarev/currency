import {routerReducer} from 'react-router-redux';
import {combineReducers} from 'redux';
import currencyRates from './currency_rates/reducer';

export const rootReducer = combineReducers({
    currencyRates: currencyRates,
    router: routerReducer,
});
