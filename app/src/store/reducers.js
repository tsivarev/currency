import {routerReducer} from 'react-router-redux';
import {combineReducers} from 'redux';
import currencyRates from './currency_rates/reducer';
import vk from './vk/reducer';

export const rootReducer = combineReducers({
    currencyRates: currencyRates,
    vk: vk,
    router: routerReducer,
});
